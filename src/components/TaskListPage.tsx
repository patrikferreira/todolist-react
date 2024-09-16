import { useContext, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { AppContext } from "../AppContext";
import TaskItem from "./TaskItem";
import { Task } from "../Types";
import { generateUniqueId } from "../Utils";
import RightPanel from "./RightPanel";
import ToastManager from "./ToastManager";
import Header from "./Header";
import { BsLayoutTextSidebarReverse, BsWindowSidebar } from "react-icons/bs";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RiArrowUpDownLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import InputContainer from "./InputContainer";

type Props = {
  title: string;
  filterImportant?: boolean;
};

export default function TaskListPage({
  title,
  filterImportant = false,
}: Props) {
  const ctx = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskIdsWithTransition, setTaskIdsWithTransition] = useState<number[]>(
    []
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const {
    isDarkMode,
    tasks,
    addTask,
    toggleTaskImportance,
    toggleTaskCompletion,
    openRightPanel,
    openSidebar,
  } = ctx;

  const MAX_TASKS = 10;

  function handleAddTask(description: string) {
    if (description.trim()) {
      if (tasks.length >= MAX_TASKS) {
        setToastMessage("Maximum number of tasks reached.");
        return;
      }
      const newTaskItem: Task = {
        id: generateUniqueId(),
        description,
        isChecked: false,
        isImportant: filterImportant,
      };
      addTask(newTaskItem);
      setTaskIdsWithTransition([newTaskItem.id]);
      setToastMessage("");
    }
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
  }

  function handleTaskClick(id: number) {
    openRightPanel();
    setSelectedTaskId(id);
  }

  const filteredTasks = tasks
    .filter((task) => (filterImportant ? task.isImportant : true))
    .filter((task) =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.isChecked === b.isChecked ? 0 : a.isChecked ? 1 : -1
  );

  useEffect(() => {
    if (taskIdsWithTransition.length > 0) {
      const timer = setTimeout(() => {
        setTaskIdsWithTransition([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [taskIdsWithTransition]);

  return (
    <div
      className={`flex h-full p-4 gap-4 animate-fade-in-left transition-all duration-300 ${
        isDarkMode ? " text-lightColor" : " text-darkColor"
      }`}
    >
      <div className="flex flex-col justify-between w-full gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h2 className="min-w-fit text-lg">{title}</h2>
            <InputContainer
              placeHolder="Search task"
              action={handleSearch}
              iconBtn={<IoSearch className="text-lg" />}
              className="w-full"
              isSearchMode={true}
            />

            <button
              className={`flex shadow-sm items-center border gap-2 py-1 px-3 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? "border-baseDark text-lightColor"
                  : "border-baseLight text-darkColor"
              }`}
            >
              <RiArrowUpDownLine />
              Sort
            </button>
          </div>

          <ul className="flex flex-col gap-2 py-2">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isDarkMode={isDarkMode}
                toggleTaskCompletion={toggleTaskCompletion}
                toggleTaskImportance={toggleTaskImportance}
                isNew={taskIdsWithTransition.includes(task.id)}
                isSelected={task.id === selectedTaskId}
                onTaskClick={handleTaskClick}
              />
            ))}
          </ul>
        </div>

        <InputContainer
          placeHolder="Create new Task"
          action={handleAddTask}
          iconBtn={<IoIosAdd className="text-base text-xl" />}
          isSearchMode={false}
        />
      </div>
      {/* <RightPanel selectedTaskId={selectedTaskId} /> */}
      {toastMessage && <ToastManager message={toastMessage} />}
    </div>
  );
}
