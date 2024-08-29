import React, { useContext } from 'react';
import { FaRegMoon } from "react-icons/fa";
import { AppContext } from "../AppContext"; // Ajuste o caminho conforme necessário

export default function DarkMode() {
    const ctx = useContext(AppContext);

    if (!ctx) {
        throw new Error("DarkMode must be used within an AppProvider");
    }

    const { isDarkMode, toggleDarkMode } = ctx;

    return (
        <div className="flex justify-between items-center p-2">
            <div className="flex gap-2 items-center text-base">
                <FaRegMoon />
                Dark mode
            </div>
            <div
                className={`relative h-5 w-8 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ${isDarkMode ? 'bg-accent' : 'bg-base'}`}
                onClick={toggleDarkMode}
            >
                <div
                    className={`absolute h-3 w-3 rounded-full bg-white transition-transform duration-300 ${isDarkMode ? 'translate-x-3' : 'translate-x-0'}`}
                />
            </div>
        </div>
    );
}
