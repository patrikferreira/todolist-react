import { useContext, useState, KeyboardEvent } from "react";
import { AppContext } from "../AppContext";
import { Task } from "../Types";
import { generateUniqueId } from "../Utils";
import ToastManager from "./ToastManager";
import TaskItem from "./TaskItem";

type Props = {
  title?: string;
  filterImportant?: boolean;
};

export default function TaskListPage({ title, filterImportant = false }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { tasks, addTask, toggleTaskCompletion, toggleTaskImportance } = ctx;
  const [taskValue, setTaskValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleAddTask() {
    if (tasks.length >= 9) {
      setErrorMessage("Task limit reached. You cannot add more than 10 tasks.");
      return;
    }

    if (taskValue.trim()) {
      const newTask: Task = {
        id: generateUniqueId(),
        description: taskValue.trim(),
        isImportant: filterImportant,
        isChecked: false,
        createdAt: new Date(),
      };
      addTask(newTask);
      setTaskValue("");
      setErrorMessage("");
    }
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  const filteredTasks = filterImportant
    ? tasks.filter((task) => task.isImportant)
    : tasks;

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="w-full border rounded-lg p-2">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Create task"
            className="outline-none p-2 w-full"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="text-sm py-2 px-4 rounded-md bg-accentColor text-lightColor transition-all duration-300 min-w-fit"
            onClick={handleAddTask}
          >
            Add task
          </button>
        </div>
      </div>

      <ul className="">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              className="flex justify-between p-2 border-b"
            />
          ))
        ) : (
          <li className="py-2 px-4">No tasks available</li>
        )}
      </ul>

      <ToastManager message={errorMessage} />
    </div>
  );
}
