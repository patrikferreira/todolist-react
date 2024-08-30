import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Task } from "../Types";
import { IoSearch } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import DateContainer from "./DateContainer";
import Check from "./Check";

export default function MyDay() {
  const ctx = useContext(AppContext);
  const [newTask, setNewTask] = useState("");

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode, tasks, addTask, toggleTaskImportance, toggleTaskCompletion } = ctx;

  const MAX_TASKS = 20;

  function handleAddTask() {
    if (newTask.trim() && tasks.length < MAX_TASKS) {
      const newTaskItem: Task = {
        id: tasks.length + 1,
        description: newTask,
        isChecked: false,
        isImportant: false,
      };
      addTask(newTaskItem);
      setNewTask("");
    }
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full gap-4 justify-between">
        <div className="flex items-center justify-between">
          <DateContainer title="My Day" />
          <div
            className={`w-3/4 rounded-lg px-2 transition-all duration-300 flex justify-between items-center ${
              isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
            }`}
          >
            <input
              type="text"
              placeholder="Search a task"
              className={`w-full outline-none p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? "bg-secondaryDark text-lightColor"
                  : "bg-primaryColor text-darkColor"
              }`}
            />
            <button className="px-2">
              <IoSearch className="text-base" />
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-2 h-full">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-300 hover:brightness-90 ${
                isDarkMode
                  ? "bg-secondaryDark text-lightColor"
                  : "bg-primaryColor text-darkColor"
              }`}
            >
              <div className="flex items-center gap-4 w-full cursor-pointer">
                <Check
                  action={() => toggleTaskCompletion(task.id)}
                  isChecked={task.isChecked}
                />
                <p className={` ${task.isChecked ? "line-through" : ""}`}>
                  {task.description}
                </p>
              </div>
              <button
                className="px-1 transition-transform duration-300 ease-in-out transform active:scale-90"
                onClick={() => toggleTaskImportance(task.id)}
              >
                {task.isImportant ? (
                  <GoStarFill className="text-accent text-lg" />
                ) : (
                  <GoStar className="text-base text-lg" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`w-full rounded-lg px-2 transition-all duration-300 flex justify-between items-center ${
            isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
          }`}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create new task"
            className={`w-full outline-none p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-secondaryDark text-lightColor"
                : "bg-primaryColor text-darkColor"
            }`}
          />
          <button className="px-2" onClick={handleAddTask}>
            <IoIosAdd className="text-base text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
