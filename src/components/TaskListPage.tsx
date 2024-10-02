import { useState, KeyboardEvent, useContext } from "react";
import { Task, MAX_TASK_LENGTH } from "../Types";
import { generateUniqueId } from "../Utils";
import ToastManager from "./ToastManager";
import TaskItem from "./TaskItem";
import Button from "./Button";
import Search from "./Search";
import SortList from "./SortList";
import { AppContext } from "../AppContext";
import ImportantCheck from "./ImportantCheck";
import NoContent from "./NoContent";

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState<string>("");
  const [editedTaskIsImportant, setEditedTaskIsImportant] = useState<boolean>(false);

  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { sortBy, updateTask, toggleTaskImportance, deleteTask } = ctx;

  function handleAddTask() {
    if (tasks.length >= 10) {
      setErrorMessage("Task limit reached. You cannot add more than 10 tasks.");
      return;
    }

    if (taskValue.trim()) {
      if (taskValue.trim().length > MAX_TASK_LENGTH) {
        setErrorMessage(
          `Task description cannot exceed ${MAX_TASK_LENGTH} characters.`
        );
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

  function handleDeleteTask(taskId: string) {
    deleteTask(listId, Number(taskId));
  }

  function handleEditTask(task: Task) {
    setEditingTask(task);
    setEditedTaskDescription(task.description);
    setEditedTaskIsImportant(task.isImportant);
  }

  function handleSaveEdit() {
    if (editingTask) {
      updateTask(listId, {
        ...editingTask,
        description: editedTaskDescription,
        isImportant: editedTaskIsImportant,
      });
      setEditingTask(null);
    }
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  function handleEditKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSaveEdit();
    }
  }

  function sortTasks(tasks: Task[]) {
    return tasks
      .filter((task) =>
        task.description.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((task) => (filterImportant ? task.isImportant : true))
      .sort((a, b) => {
        if (a.isChecked === b.isChecked) {
          if (sortBy === "important") {
            return a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1;
          }
          return a.createdAt > b.createdAt ? -1 : 1;
        }
        return a.isChecked ? 1 : -1;
      });
  }

  const filteredTasks = sortTasks(tasks);

  return (
    <div className="flex flex-col gap-4 h-full">
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

      <ul className="h-full">
        <div
          className={`rounded-lg border w-full min-h-fit p-4 ${
            editingTask ? "flex" : "hidden"
          }`}
        >
          {editingTask && (
            <div className="flex w-full flex-col gap-2">
              <input
                type="text"
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
                onKeyDown={handleEditKeyPress}
                className="p-2 outline-none border rounded-lg text-sm"
                maxLength={MAX_TASK_LENGTH}
              />
              <div className="flex justify-between items-center gap-2">
                <div className={`text-sm ${editedTaskDescription.length >= MAX_TASK_LENGTH ? "text-accent" : ""}`}>
                  {editedTaskDescription.length}/{MAX_TASK_LENGTH}
                </div>
                <div className="flex items-center gap-2">
                  <ImportantCheck
                    action={() => setEditedTaskIsImportant(!editedTaskIsImportant)}
                    isChecked={editedTaskIsImportant}
                    className="p-2 rounded-lg"
                  />
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
          )}
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              listId={listId}
              className="flex justify-between p-2 border-b"
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id.toString())}
            />
          ))
        ) : (
          <NoContent className="h-32 md:h-40" img={<img src="/src/assets/todo.svg" className="h-full" alt="" />} title="There are no tasks created yet." />
        )}
      </ul>
      <ToastManager message={errorMessage} />
    </div>
  );
}
