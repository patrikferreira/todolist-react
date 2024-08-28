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
    const [selectedRoute, setSelectedRoute] = useState<string>('myDay');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <AppContext.Provider value={{ selectedRoute, setSelectedRoute, isDarkMode, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    );
}
