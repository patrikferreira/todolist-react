import { createContext, useState, ReactNode } from "react";
import { Task, TaskList } from "./Types";

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
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [taskLists, setTaskLists] = useState<TaskList[]>(initialTaskLists);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addTaskList = (newList: TaskList) => {
    const exists = taskLists.some((list) => list.id === newList.id);
    if (!exists) {
      setTaskLists((prevLists) => [...prevLists, newList]);
    }
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
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
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
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task: Task) =>
                task.id === taskId
                  ? { ...task, isImportant: !task.isImportant }
                  : task
              ),
            }
          : list
      )
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
