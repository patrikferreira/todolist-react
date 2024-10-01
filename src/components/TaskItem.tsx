import { useContext, useState } from "react";
import { Task } from "../Types";
import { AppContext } from "../AppContext";
import Check from "./Check";
import ImportantCheck from "./ImportantCheck";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

type Props = {
  task: Task;
  listId: string;
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  task,
  listId,
  className,
  onEdit,
  onDelete,
}: Props) {
  const ctx = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);

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
    <li
      className={`animate-fade-in-left flex transition-all duration-200 hover:bg-hoverColor ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 w-full">
        <div className="pt-1">
          <Check
            action={() => toggleTaskCompletion(listId, task.id)}
            isChecked={task.isChecked}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div>
            <p
              className={`${
                task.isChecked ? "line-through text-secondColor" : ""
              } transition-all`}
            >
              {task.description}
            </p>
            <span className="text-xs text-secondColor">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className={`pt-1 flex items-start transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <ImportantCheck
            action={() => toggleTaskImportance(listId, task.id)}
            isChecked={task.isImportant}
          />
          <button className=" text-secondColor" onClick={onEdit}>
            <FiEdit />
          </button>
          <button className=" text-secondColor" onClick={onDelete}>
            <GoTrash />
          </button>
        </div>
      </div>
    </li>
  );
}
