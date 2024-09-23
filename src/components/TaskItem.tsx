import { useContext } from "react";
import { Task } from "../Types";
import { AppContext } from "../AppContext";
import Check from "./Check";
import ImportantCheck from "./ImportantCheck";

type Props = {
  task: Task;
  listId: string;
  className?: string;
};

export default function TaskItem({ task, listId, className }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { toggleTaskCompletion, toggleTaskImportance } = ctx;

  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${month} ${day}, ${hours}:${minutes}${ampm}`;
  }

  return (
    <li className={`animate-fade-in-down flex ${className}`}>
      <div className="flex gap-2 w-full">
        <div className="pt-1">
          <Check
            action={() => toggleTaskCompletion(listId, task.id)}
            isChecked={task.isChecked}
          />
        </div>
        <div className="flex flex-col gap-1 w-full cursor-pointer">
          <p
            className={`${
              task.isChecked ? "line-through text-baseColor" : ""
            } transition-all`}
          >
            {task.description}
          </p>
          <span className="text-xs text-baseColor">
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="pt-1 flex items-start gap-2">
        <ImportantCheck
          action={() => toggleTaskImportance(listId, task.id)}
          isChecked={task.isImportant}
        />
      </div>
    </li>
  );
}
