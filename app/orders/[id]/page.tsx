"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = params.id;

  const [order, setOrder] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/employee/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-10 text-red-500 text-3xl">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/orders"
          className="bg-slate-700 text-white px-6 py-3 rounded-lg"
        >
          ← Orders
        </Link>

        <h1 className="text-5xl font-bold">
          Order Details
        </h1>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-md max-w-3xl">
        <h2 className="text-4xl font-bold mb-6">
          {order.productName}
        </h2>

        <div className="space-y-4 text-xl">
          <p>
            <span className="font-semibold">
              Order ID:
            </span>{" "}
            {order.id}
          </p>

          <p>
            <span className="font-semibold">
              Quantity:
            </span>{" "}
            {order.quantity}
          </p>

          <p>
            <span className="font-semibold">
              Price:
            </span>{" "}
            {order.price}
          </p>

          <p>
            <span className="font-semibold">
              Total Amount:
            </span>{" "}
            {order.totalAmount}
          </p>

          <p>
            <span className="font-semibold">
              Employee ID:
            </span>{" "}
            {order.employee?.id}
          </p>

          <p>
            <span className="font-semibold">
              Supplier ID:
            </span>{" "}
            {order.supplier?.id}
          </p>

          <p>
            <span className="font-semibold">
              Task ID:
            </span>{" "}
            {order.task?.id}
          </p>
        </div>
      </div>
    </div>
  );
}