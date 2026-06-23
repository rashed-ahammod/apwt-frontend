"use client";

type Props = {
  amount: string;
  status: string;
  orderId: string;

  setAmount: (value: string) => void;
  setStatus: (value: string) => void;
  setOrderId: (value: string) => void;

  handleAddPayment: () => void;
};

export default function PaymentForm({
  amount,
  status,
  orderId,
  setAmount,
  setStatus,
  setOrderId,
  handleAddPayment,
}: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md mb-10">

      <div className="space-y-6">

        {/* AMOUNT */}
        <div>
          <label className="block mb-2 text-xl font-semibold">
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-2 text-xl font-semibold">
            Payment Status
          </label>

          <input
            type="text"
            placeholder="Paid / Pending"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />
        </div>

        {/* ORDER ID */}
        <div>
          <label className="block mb-2 text-xl font-semibold">
            Order ID
          </label>

          <input
            type="number"
            placeholder="Enter order ID"
            value={orderId}
            onChange={(e) =>
              setOrderId(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddPayment}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
        >
          Add Payment
        </button>

      </div>
    </div>
  );
}