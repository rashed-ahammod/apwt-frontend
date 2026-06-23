"use client";

import React, {
  JSX,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/app/component/navbar";

import UserInfo from "@/app/component/dashboard/userinfo";

import DashboardCard from "@/app/component/dashboard/dashboardcard";



type UserType = {
  id: number;
  name: string;
  role: string;
};



export default function DashboardPage(): JSX.Element {

  const router = useRouter();

  const [user, setUser] =
    useState<UserType | null>(null);

  // AUTH CHECK 

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

      return;
    }

    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  //ui

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar
        title="Dashboard"
        showDashboard={false}
      />

      <div className="p-8">

        <UserInfo user={user} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            title="Tasks"
            description="View and manage employee tasks."
            buttonText="Go to Tasks"
            path="/tasks"
            color="bg-blue-600 hover:bg-blue-700"
          />

          <DashboardCard
            title="Orders"
            description="Create and manage orders."
            buttonText="Go to Orders"
            path="/orders"
            color="bg-green-600 hover:bg-green-700"
          />

          <DashboardCard
            title="Payments"
            description="Track and manage payments."
            buttonText="Go to Payments"
            path="/payments"
            color="bg-purple-600 hover:bg-purple-700"
          />

        </div>
      </div>
    </div>
  );
}