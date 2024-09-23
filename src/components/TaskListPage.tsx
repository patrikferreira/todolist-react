import { useState, KeyboardEvent } from "react";
import { Task } from "../Types";
import { generateUniqueId } from "../Utils";
import ToastManager from "./ToastManager";
import TaskItem from "./TaskItem";
import Button from "./Button";

type Props = {
  title?: string;
  tasks: Task[];
  onAddTask: (task: Task) => void;
  filterImportant?: boolean;
  listId: string; // Adicione listId como prop
};

export default function TaskListPage({ title, tasks, onAddTask, filterImportant = false, listId }: Props) {
  const [taskValue, setTaskValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleAddTask() {
    if (tasks.length >= 10) {
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
      onAddTask(newTask);
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
    <div className="flex flex-col gap-4">
      <div className="w-full border rounded-lg p-2">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Create task"
            className="outline-none p-2 w-full text-sm"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button title="Add task" action={handleAddTask} className="min-w-fit py-2 px-4 rounded-md" />
        </div>
      </div>

      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              listId={listId}
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
