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

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addTaskList = (newList: TaskList) => {
    const exists = taskLists.some((list) => list.id === newList.id);
    const isLimitReached = taskLists.length >= MAX_PROJECTS;

    if (!newList.title.trim()) {
      setErrorMessage("Project name cannot be empty.");
      return;
    }

    if (exists) {
      setErrorMessage("A project with this name already exists.");
      return;
    }

    if (isLimitReached) {
      setErrorMessage(`You can only create up to ${MAX_PROJECTS - 1} projects.`);
      return;
    }

    setTaskLists((prevLists) => [...prevLists, newList]);
  };

  const deleteTaskList = (listId: string) => {
    setTaskLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const editTaskList = (listId: string, newTitle: string) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  };

  const addTask = (listId: string, newTask: Task) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          if (list.tasks.length >= 10) {
            setErrorMessage("Task limit reached. You cannot add more than 10 tasks.");
            return list;
          }
          return { ...list, tasks: [...list.tasks, newTask] };
        }
        return list;
      })
    );
  };

  const updateTask = (listId: string, updatedTask: Task) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task: Task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            }
          : list
      )
    );
  };

  const deleteTask = (listId: string, taskId: number) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task: Task) => task.id !== taskId),
            }
          : list
      )
    );
  };

  const toggleTaskImportance = (listId: string, taskId: number) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task: Task) =>
              task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
            ),
          };
        }
        return list;
      })
    );
  };

  const toggleTaskCompletion = (listId: string, taskId: number) => {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task: Task) =>
                task.id === taskId
                  ? { ...task, isChecked: !task.isChecked }
                  : task
              ),
            }
          : list
      )
    );
  };

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
