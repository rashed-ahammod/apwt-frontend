type UserType = {
  id: number;
  name: string;
  role: string;
};

type Props = {
  user: UserType | null;
};

export default function UserInfo({
  user,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-2">
        Welcome {user?.name || "User"}
      </h2>

      <p className="text-gray-600 mb-1">
        User ID: {user?.id || "N/A"}
      </p>

      <p className="text-gray-600 mb-3">
        Role: {user?.role || "N/A"}
      </p>

      <p className="text-gray-600">
        Manage tasks, orders, payments and
        expenses.
      </p>
    </div>
  );
}