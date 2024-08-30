import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { Task } from './Types';

type AppContextType = {
    selectedRoute: string;
    setSelectedRoute: (route: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTaskImportance: (taskId: number) => void;
    toggleTaskCompletion: (taskId: number) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
    const [selectedRoute, setSelectedRoute] = useState<string>(() => {
        return localStorage.getItem('selectedRoute') || 'myDay';
    });

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('isDarkMode') === 'true';
    });

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        localStorage.setItem('selectedRoute', selectedRoute);
    }, [selectedRoute]);

    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const addTask = (task: Task) => {
        setTasks(prevTasks => [...prevTasks, task]);
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
            value={{ selectedRoute, setSelectedRoute, isDarkMode, toggleDarkMode, tasks, addTask, toggleTaskImportance, toggleTaskCompletion }}
        >
            {children}
        </AppContext.Provider>
    );
}
