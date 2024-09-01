import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { Task } from "../Types";
import { GoStar, GoStarFill } from "react-icons/go";
import Check from "./Check"; // Import do componente Check

type Props = {
  selectedTaskId: number | null;
};

export default function CustomTask({ selectedTaskId }: Props) {
  const ctx = useContext(AppContext);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { tasks, updateTask, deleteTask } = ctx;

  useEffect(() => {
    if (selectedTaskId !== null) {
      const task = tasks.find((task) => task.id === selectedTaskId) || null;
      setEditingTask(task);
      if (task) {
        setDescription(task.description);
        setIsImportant(task.isImportant);
        setIsChecked(task.isChecked);
      }
    }
  }, [selectedTaskId, tasks]);

  function handleSave() {
    if (editingTask) {
      updateTask({
        ...editingTask,
        description,
        isImportant,
        isChecked,
      });
    }
  }

  function handleDelete() {
    if (editingTask) {
      deleteTask(editingTask.id);
    }
  }

  if (!editingTask) {
    return <div>No task available for customization.</div>;
  }

  return (
    <div
      className={`flex flex-col justify-between gap-4 h-full transition-all duration-300 ${
        ctx.isDarkMode
          ? "bg-secondaryDark text-lightColor"
          : "bg-primaryColor text-darkColor"
      }`}
    >
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`py-2 px-4 rounded-md transition-all duration-300 ${
            ctx.isDarkMode
              ? "bg-primaryDark text-lightColor"
              : "bg-secondaryColor text-darkColor"
          }`}
          placeholder="Task Description"
        />
        <div className="flex items-center gap-4">
          <label
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsChecked(!isChecked)}
          >
            <Check isChecked={isChecked} action={() => setIsChecked(!isChecked)} />
            <span>Completed</span>
          </label>
          <button
            className="flex items-center gap-2"
            onClick={() => setIsImportant(!isImportant)}
          >
            {isImportant ? (
              <GoStarFill className="text-accent text-lg" />
            ) : (
              <GoStar className="text-base text-lg" />
            )}
            <span>Important</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleSave}
          className="bg-accent text-white p-2 rounded-md"
        >
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-md mt-2"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
