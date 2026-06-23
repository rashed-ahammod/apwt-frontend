"use client";

import axios from "axios";

import {
  JSX,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/app/component/navbar";

import PaymentForm from "@/app/component/payments/paymentform";

import PaymentCard from "@/app/component/payments/paymentcard";

type Payment = {
  id: number;
  amount: number;
  status: string;
  order?: {
    id: number;
  };
};

export default function PaymentsPage(): JSX.Element {

  const router = useRouter();

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [amount, setAmount] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [orderId, setOrderId] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // LOAD PAYMENTS
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

    } else {

      fetchPayments();

    }

  }, []);

  const fetchPayments = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/employee/payment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data);

    } catch (err) {

      setError(
        "Failed to load payments"
      );

    }
  };

  // ADD PAYMENT
  const handleAddPayment =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.post(
          "http://localhost:5000/employee/payment",
          {
            amount: Number(amount),
            status,
            orderId: Number(orderId),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPayments([
          ...payments,
          res.data,
        ]);

        setAmount("");
        setStatus("");
        setOrderId("");

        setSuccess(
          "Payment added successfully"
        );

        setError("");

      } catch (err) {

        setError(
          "Failed to add payment"
        );

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <Navbar title="Payments Management" />

      {error && (
        <p className="text-red-500 mb-5">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-600 mb-5">
          {success}
        </p>
      )}

      <PaymentForm
        amount={amount}
        status={status}
        orderId={orderId}
        setAmount={setAmount}
        setStatus={setStatus}
        setOrderId={setOrderId}
        handleAddPayment={
          handleAddPayment
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
          />
        ))}

      </div>
    </div>
  );
}