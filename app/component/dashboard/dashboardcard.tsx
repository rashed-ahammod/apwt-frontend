"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  path: string;
  color: string;
};

export default function DashboardCard({
  title,
  description,
  buttonText,
  path,
  color,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-2xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-600 mb-5">
        {description}
      </p>

      <button
        onClick={() => router.push(path)}
        className={`${color} text-white px-5 py-2 rounded-lg`}
      >
        {buttonText}
      </button>
    </div>
  );
}