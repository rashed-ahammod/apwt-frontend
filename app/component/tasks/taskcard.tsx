"use client";

import TaskStatusButton from "./taskstatusbutton";

type Task = {
  id: number;
  title: string;
  status: string;
};

type Props = {
  task: Task;
  updateStatus: (
    id: number,
    status: string
  ) => void;
};

export default function TaskCard({
  task,
  updateStatus,
}: Props) {
  const isCompleted =
    task.status === "complete";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-4">
        {task.title}
      </h2>

      <p className="text-xl mb-6">
        <span className="font-semibold">
          Status:
        </span>{" "}
        {task.status}
      </p>

      <div className="flex gap-3 flex-wrap">

        <TaskStatusButton
          text="Pending"
          color="bg-yellow-500 hover:bg-yellow-600"
          disabled={isCompleted}
          onClick={() =>
            updateStatus(task.id, "pending")
          }
        />

        <TaskStatusButton
          text="Progress"
          color="bg-blue-500 hover:bg-blue-600"
          disabled={isCompleted}
          onClick={() =>
            updateStatus(task.id, "progress")
          }
        />

        <TaskStatusButton
          text="Complete"
          color="bg-green-500 hover:bg-green-600"
          disabled={isCompleted}
          onClick={() =>
            updateStatus(task.id, "complete")
          }
        />

      </div>
    </div>
  );
}