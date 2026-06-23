"use client";

import Link from "next/link";

// ---------------- TYPES ----------------

type OrderType = {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
};

type Props = {
  order: OrderType;

  onDelete: (id: number) => void;

  onEdit: (
    order: OrderType
  ) => void;
};

// ---------------- COMPONENT ----------------

export default function OrderCard({
  order,
  onDelete,
  onEdit,
}: Props) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-3xl font-bold mb-4">
        {order.productName}
      </h2>

      <div className="space-y-3 text-lg mb-5">

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
            Total:
          </span>{" "}
          {order.totalAmount}
        </p>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 flex-wrap">

        {/* DETAILS */}
        <Link
          href={`/orders/${order.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

        {/* UPDATE */}
        <button
          onClick={() => onEdit(order)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Update
        </button>

        {/* DELETE */}
        <button
          onClick={() =>
            onDelete(order.id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>
    </div>
  );
}