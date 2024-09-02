import React, { createContext, ReactNode, useState } from 'react';
import { Task } from './Types';

type AppContextType = {
    selectedRoute: string;
    setSelectedRoute: (route: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (taskId: number) => void;
    toggleTaskImportance: (taskId: number) => void;
    toggleTaskCompletion: (taskId: number) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
    const [selectedRoute, setSelectedRoute] = useState<string>('myDay');

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const addTask = (task: Task) => {
        setTasks(prevTasks => [...prevTasks, task]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const toggleTaskImportance = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
            )
        );
    };

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    return (
        <AppContext.Provider
            value={{ selectedRoute, setSelectedRoute, isDarkMode, toggleDarkMode, tasks, addTask, updateTask, deleteTask, toggleTaskImportance, toggleTaskCompletion }}
        >
            {children}
        </AppContext.Provider>
    );
}
