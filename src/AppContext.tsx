import { createContext, useState, ReactNode } from "react";
import { Task, TaskList, MAX_PROJECTS } from "./Types";

const initialTaskLists: TaskList[] = [
  {
    id: "myday",
    title: "My Day",
    tasks: [],
  },
];

type AppContextType = {
  taskLists: TaskList[];
  addTaskList: (newList: TaskList) => void;
  deleteTaskList: (listId: string) => void;
  editTaskList: (listId: string, newTitle: string) => void;
  addTask: (listId: string, task: Task) => void;
  updateTask: (listId: string, updatedTask: Task) => void;
  deleteTask: (listId: string, taskId: number) => void;
  toggleTaskImportance: (listId: string, taskId: number) => void;
  toggleTaskCompletion: (listId: string, taskId: number) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [taskLists, setTaskLists] = useState<TaskList[]>(initialTaskLists);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function addTaskList(newList: TaskList) {
    if (taskLists.length < MAX_PROJECTS) {
      setTaskLists((prev) => [...prev, newList]);
    } else {
      setErrorMessage("Maximum number of projects reached.");
    }
  }

  function deleteTaskList(listId: string) {
    setTaskLists((prev) => prev.filter((list) => list.id !== listId));
  }

  function editTaskList(listId: string, newTitle: string) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  }

  function addTask(listId: string, newTask: Task) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
    );
  }

  function updateTask(listId: string, updatedTask: Task) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
            }
          : list
      )
    );
  }

  function deleteTask(listId: string, taskId: number) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
  }

  function toggleTaskImportance(listId: string, taskId: number) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, isImportant: !task.isImportant } : task)),
            }
          : list
      )
    );
  }

  function toggleTaskCompletion(listId: string, taskId: number) {
    setTaskLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, isChecked: !task.isChecked } : task)),
            }
          : list
      )
    );
  }

  return (
    <AppContext.Provider
      value={{
        taskLists,
        addTaskList,
        deleteTaskList,
        editTaskList,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskImportance,
        toggleTaskCompletion,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        errorMessage,
        setErrorMessage,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
