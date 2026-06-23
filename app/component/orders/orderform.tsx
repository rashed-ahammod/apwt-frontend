"use client";

import React from "react";

// ---------------- TYPES ----------------

type FormType = {
  productName: string;
  quantity: string;
  price: string;
  taskId: string;
  supplierId: string;
};

type Props = {
  formData: FormType;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleSubmit: (
    e: React.FormEvent
  ) => void;

  editingId: number | null;
};

// ---------------- COMPONENT ----------------

export default function OrderForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
}: Props) {

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md"
    >

      {/* PRODUCT NAME */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Product Name
        </label>

        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full border p-4 rounded-xl"
        />
      </div>

      {/* QUANTITY */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Quantity
        </label>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          className="w-full border p-4 rounded-xl"
        />
      </div>

      {/* PRICE */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full border p-4 rounded-xl"
        />
      </div>

      {/* TASK ID */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Task ID
        </label>

        <input
          type="number"
          name="taskId"
          value={formData.taskId}
          onChange={handleChange}
          placeholder="Enter task ID"
          className="w-full border p-4 rounded-xl"
        />
      </div>

      {/* SUPPLIER ID */}
      <div className="mb-5">

        <label className="block font-semibold mb-2">
          Supplier ID
        </label>

        <input
          type="number"
          name="supplierId"
          value={formData.supplierId}
          onChange={handleChange}
          placeholder="Enter supplier ID"
          className="w-full border p-4 rounded-xl"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
      >
        {editingId
          ? "Update Order"
          : "Create Order"}
      </button>

    </form>
  );
}