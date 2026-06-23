"use client";

import { useRouter } from "next/navigation";

type NavbarProps = {
  title: string;
  showDashboard?: boolean;
};

export default function Navbar({
  title,
  showDashboard = true,
}: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md rounded-xl mb-8">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="flex gap-4">

        {showDashboard && (
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-slate-700 hover:bg-slate-800 px-5 py-2 rounded-lg"
          >
            Dashboard
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}