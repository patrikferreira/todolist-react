import { useContext, useState } from "react";
import { Task } from "../Types";
import { AppContext } from "../AppContext";
import Check from "./Check";
import ImportantCheck from "./ImportantCheck";
import { GoTrash } from "react-icons/go";

type Props = {
  task: Task;
  listId: string;
  className?: string;
};

export default function TaskItem({ task, listId, className }: Props) {
  const ctx = useContext(AppContext);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editedTaskDescription, setEditedTaskDescription] = useState<string>(task.description);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { toggleTaskCompletion, toggleTaskImportance, updateTask, deleteTask } = ctx;

  function handleEditTask() {
    setEditOpen(!editOpen);
  }

  function handleSaveEdit() {
    updateTask(listId, { ...task, description: editedTaskDescription });
    setEditOpen(false);
  }

  function handleCancelEdit() {
    setEditedTaskDescription(task.description);
    setEditOpen(false);
  }

  function handleDeleteTask() {
    deleteTask(listId, task.id);
  }

  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${month} ${day}, ${hours}:${minutes}${ampm}`;
  }

  return (
    <li className={`animate-fade-in-left flex ${className}`}>
      <div className="flex gap-2 w-full">
        <div className="pt-1">
          <Check
            action={() => toggleTaskCompletion(listId, task.id)}
            isChecked={task.isChecked}
          />
        </div>
        <div className="flex flex-col gap-1 w-full cursor-pointer">
          <div onClick={handleEditTask}>
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
          <div className={`transition-all duration-200 ${editOpen ? "flex flex-col gap-2" : "hidden"}`}>
            <input
              type="text"
              value={editedTaskDescription}
              onChange={(e) => setEditedTaskDescription(e.target.value)}
              className="p-2 outline-none border rounded-lg text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit();
                }
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                className="p-2 bg-hoverColor rounded-lg text-secondColor"
                onClick={handleDeleteTask}
              >
                <GoTrash />
              </button>
              <button
                className="bg-focusColor text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:brightness-75"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="bg-accent text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:brightness-75"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
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
