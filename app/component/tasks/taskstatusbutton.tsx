"use client";

type Props = {
  text: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function TaskStatusButton({
  text,
  color,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color} text-white px-4 py-2 rounded-lg disabled:bg-gray-400`}
    >
      {text}
    </button>
  );
}