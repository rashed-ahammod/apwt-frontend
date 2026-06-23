"use client";

import React, {
  JSX,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { z } from "zod";

import Navbar from "@/app/component/navbar";

import OrderForm from "@/app/component/orders/orderform";

import OrderCard from "@/app/component/orders/ordercard";

// ZOD SCHEMA 

const orderSchema = z.object({

  productName: z
    .string()
    .min(
      3,
      "Product name must be at least 3 characters"
    ),

  quantity: z
    .number()
    .min(
      1,
      "Quantity must be at least 1"
    ),

  price: z
    .number()
    .positive(
      "Price must be positive"
    ),

  taskId: z
    .number()
    .min(1, "Task ID required"),

  supplierId: z
    .number()
    .min(
      1,
      "Supplier ID required"
    ),
});

//  TYPES 

type OrderType = {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
};

type FormType = {
  productName: string;
  quantity: string;
  price: string;
  taskId: string;
  supplierId: string;
};

//  COMPONENT 

export default function OrdersPage(): JSX.Element {

  const router = useRouter();

  //  STATES 

  const [orders, setOrders] =
    useState<OrderType[]>([]);

  const [error, setError] =
    useState<string>("");

  const [success, setSuccess] =
    useState<string>("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  //  FORM STATE 

  const [formData, setFormData] =
    useState<FormType>({
      productName: "",
      quantity: "",
      price: "",
      taskId: "",
      supplierId: "",
    });

  //  AUTH CHECK

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

    } else {

      fetchOrders();

    }

  }, []);

  //  FETCH ORDERS 

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/employee/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);

    } catch (err) {

      setError(
        "Failed to load orders"
      );

    }
  };

  //  HANDLE INPUT

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // SUBMIT 

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setError("");
      setSuccess("");

      const token =
        localStorage.getItem("token");

      const payload = {

        productName:
          formData.productName,

        quantity: Number(
          formData.quantity
        ),

        price: Number(
          formData.price
        ),

        taskId: Number(
          formData.taskId
        ),

        supplierId: Number(
          formData.supplierId
        ),
      };

      // ZOD VALIDATION 

      const validation =
        orderSchema.safeParse(
          payload
        );

      if (!validation.success) {

        const errors =
          validation.error.flatten()
            .fieldErrors;

        setError(
          Object.values(errors)
            .flat()
            .join(", ")
        );

        return;
      }

      // UPDATE

      if (editingId) {

        await axios.put(
          `http://localhost:5000/employee/orders/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccess(
          "Order updated successfully"
        );

      }

      //  CREATE 

      else {

        await axios.post(
          "http://localhost:5000/employee/orders",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccess(
          "Order created successfully"
        );

      }

      // ---------------- RESET ----------------

      setFormData({
        productName: "",
        quantity: "",
        price: "",
        taskId: "",
        supplierId: "",
      });

      setEditingId(null);

      fetchOrders();

    } catch (err) {

      setError(
        "Failed to save order"
      );

    }
  };

  // DELETE 

  const deleteOrder = async (
    id: number
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/employee/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(
        orders.filter(
          (order) =>
            order.id !== id
        )
      );

      alert(
        "Order deleted successfully"
      );

    } catch (err) {

      alert(
        "Failed to delete order"
      );

    }
  };

  // ---------------- EDIT ----------------

  const editOrder = (
    order: OrderType
  ) => {

    setEditingId(order.id);

    setFormData({

      productName:
        order.productName,

      quantity:
        order.quantity.toString(),

      price:
        order.price.toString(),

      taskId: "",

      supplierId: "",

    });

  };

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <Navbar title="Orders Management" />

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mb-5">
          {error}
        </p>
      )}

      {/* SUCCESS */}
      {success && (
        <p className="text-green-600 mb-5">
          {success}
        </p>
      )}

      {/* FORM */}
      <OrderForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      {/* ORDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

        {orders.map((order) => (

          <OrderCard
            key={order.id}
            order={order}
            onDelete={deleteOrder}
            onEdit={editOrder}
          />

        ))}

      </div>
    </div>
  );
}