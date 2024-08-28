import Reac, { createContext, ReactNode, useState } from 'react';

type NavigationContextType = {
    selectedRoute: string;
    setSelectedRoute: (route: string) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

type NavigationProviderProps = {
    children: ReactNode;
}

export function NavigationProvider({children}: NavigationProviderProps) {
    const [selectedRoute, setSelectedRoute] = useState<string>('myDay');

    return (
        <NavigationContext.Provider value={{selectedRoute, setSelectedRoute}}>
            {children}
        </NavigationContext.Provider>
    )

}