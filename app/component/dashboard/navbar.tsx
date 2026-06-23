"use client";

type Props = {
  handleLogout: () => void;
};

export default function Navbar({
  handleLogout,
}: Props) {
  return (
    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        Invoice & Expense Management
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}