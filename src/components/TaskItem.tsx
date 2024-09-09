import { useContext } from "react";
import { Task } from "../Types";
import { GoStar, GoStarFill } from "react-icons/go";
import Check from "./Check";
import { AppContext } from "../AppContext";

type Props = {
  task: Task;
  isDarkMode: boolean;
  toggleTaskCompletion: (id: number) => void;
  toggleTaskImportance: (id: number) => void;
  isNew: boolean;
  isSelected: boolean;
  onTaskClick: (id: number) => void;
};

export default function TaskItem({
  task,
  isDarkMode,
  toggleTaskCompletion,
  toggleTaskImportance,
  isNew,
  isSelected,
  onTaskClick,
}: Props) {
  const ctx = useContext(AppContext);
  const { isCapitalize } = ctx || {};

  const backgroundColorClass = isSelected
    ? isDarkMode
      ? "bg-baseDark text-lightColor shadow-md"
      : "bg-baseLight text-darkColor"
    : isDarkMode
    ? "bg-darkColor text-lightColor"
    : "bg-lightColor text-darkColor";

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
          className={`py-3 w-full cursor-pointer ${
            task.isChecked ? "line-through" : ""
          } ${isCapitalize ? "capitalize" : ""}`}
          onClick={() => onTaskClick(task.id)}
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
