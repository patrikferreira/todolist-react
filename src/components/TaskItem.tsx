import React from "react";
import { Task } from "../Types";
import { GoStar, GoStarFill } from "react-icons/go";
import Check from "./Check";

type Props = {
  task: Task;
  isDarkMode: boolean;
  toggleTaskCompletion: (id: number) => void;
  toggleTaskImportance: (id: number) => void;
  isNew: boolean;
  isSelected: boolean;
  onTaskClick: (id: number) => void; // Renamed to onTaskClick
};

export default function TaskItem({
  task,
  isDarkMode,
  toggleTaskCompletion,
  toggleTaskImportance,
  isNew,
  isSelected,
  onTaskClick, // Renamed to onTaskClick
}: Props) {
  const backgroundColorClass = isSelected
    ? isDarkMode
      ? "bg-baseDark text-lightColor"
      : "bg-baseLight text-darkColor"
    : isDarkMode
    ? "bg-secondaryDark text-lightColor"
    : "bg-primaryColor text-darkColor";

  return (
    <li
      className={`flex justify-between items-center px-4 rounded-lg transition-all duration-300 hover:brightness-90 ${backgroundColorClass} ${
        isNew ? "animate-fade-in-left" : ""
      }`}
    >
      <div className="flex items-center gap-4 w-full">
        <Check
          action={() => toggleTaskCompletion(task.id)}
          isChecked={task.isChecked}
        />
        <p
          className={`py-3 w-full cursor-pointer ${task.isChecked ? "line-through" : ""}`}
          onClick={() => onTaskClick(task.id)} // Trigger onTaskClick here
        >
          {task.description}
        </p>
      </div>
      <button
        className="px-1 transition-transform duration-300 ease-in-out transform active:scale-90"
        onClick={(e) => {
          e.stopPropagation();
          toggleTaskImportance(task.id);
        }}
      >
        {task.isImportant ? (
          <GoStarFill className="text-accent text-lg" />
        ) : (
          <GoStar className="text-base text-lg" />
        )}
      </button>
    </li>
  );
}
