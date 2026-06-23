type Payment = {
  id: number;
  amount: number;
  status: string;
  order?: {
    id: number;
  };
};

type Props = {
  payment: Payment;
};

export default function PaymentCard({
  payment,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-3xl font-bold mb-4">
        Payment #{payment.id}
      </h2>

      <div className="space-y-3 text-lg">

        <p>
          <span className="font-semibold">
            Amount:
          </span>{" "}
          {payment.amount}
        </p>

        <p>
          <span className="font-semibold">
            Status:
          </span>{" "}
          {payment.status}
        </p>

        <p>
          <span className="font-semibold">
            Order ID:
          </span>{" "}
          {payment.order?.id}
        </p>

      </div>
    </div>
  );
}