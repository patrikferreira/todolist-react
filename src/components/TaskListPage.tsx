import { useState, KeyboardEvent, useContext } from "react";
import { Task, MAX_TASK_LENGTH } from "../Types";
import { generateUniqueId } from "../Utils";
import ToastManager from "./ToastManager";
import TaskItem from "./TaskItem";
import Button from "./Button";
import Search from "./Search";
import SortList from "./SortList";
import { AppContext } from "../AppContext";
import Modal from "./Modal";

type Props = {
  title?: string;
  tasks: Task[];
  onAddTask: (task: Task) => void;
  filterImportant?: boolean;
  listId: string;
};

export default function TaskListPage({
  title,
  tasks,
  onAddTask,
  filterImportant = false,
  listId,
}: Props) {
  const [taskValue, setTaskValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { sortBy } = ctx;

  function handleAddTask() {
    if (tasks.length >= 10) {
      setErrorMessage("Task limit reached. You cannot add more than 10 tasks.");
      return;
    }

    if (taskValue.trim()) {
      if (taskValue.trim().length > MAX_TASK_LENGTH) {
        setErrorMessage(`Task description cannot exceed ${MAX_TASK_LENGTH} characters.`);
        return;
      }

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

  function sortTasks(tasks: Task[]) {
    if (sortBy === "important") {
      return tasks.sort((a, b) =>
        a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1
      );
    }
    return tasks.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

  const filteredTasks = sortTasks(
    tasks
      .filter((task) =>
        task.description.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((task) => (filterImportant ? task.isImportant : true))
  );

  return (
    <div className="flex flex-col gap-4">
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
              maxLength={MAX_TASK_LENGTH}
            />
            <Button
              title="Add task"
              action={handleAddTask}
              className="min-w-fit py-2 px-4 rounded-md"
            />
          </div>
          {taskValue.length > MAX_TASK_LENGTH && (
            <p className="text-red-500 text-sm">
              Task description cannot exceed {MAX_TASK_LENGTH} characters.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Search searchValue={searchValue} onSearchChange={setSearchValue} />
          <SortList />
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
