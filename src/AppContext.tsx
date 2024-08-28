import React, { createContext, ReactNode, useState, useEffect } from 'react';

type AppContextType = {
    selectedRoute: string;
    setSelectedRoute: (route: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
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

    useEffect(() => {
        localStorage.setItem('selectedRoute', selectedRoute);
    }, [selectedRoute]);

    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <AppContext.Provider value={{ selectedRoute, setSelectedRoute, isDarkMode, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    );
}
