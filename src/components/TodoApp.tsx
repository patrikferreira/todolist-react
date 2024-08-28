import React, { useContext } from 'react';
import { NavigationContext } from "../NavigationContext";

export default function TodoApp() {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error('TodoApp must be used within a NavigationProvider');
    }

    return (
        <div>
            <p>Selecionada: {context.selectedRoute}</p>
        </div>
    );
}
