"use client";

import axios from "axios";

import {
  JSX,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/app/component/navbar";

import TaskCard from "@/app/component/tasks/taskcard";

type Task = {
  id: number;
  title: string;
  status: string;
};

export default function TasksPage(): JSX.Element {

  const router = useRouter();

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [error, setError] =
    useState<string>("");

  // LOAD TASKS
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

    } else {

      fetchTasks();

    }

  }, []);

  const fetchTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/employee/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {

      setError("Failed to load tasks");

    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    id: number,
    status: string
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/employee/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, status }
            : task
        )
      );

    } catch (err) {

      setError(
        "Failed to update task"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <Navbar title="Tasks Management" />

      {error && (
        <p className="text-red-500 mb-5">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateStatus={updateStatus}
          />
        ))}

      </div>
    </div>
  );
}