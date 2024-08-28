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
                className={`relative h-6 w-10 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ${isDarkMode ? 'bg-activeColor' : 'bg-base'}`}
                onClick={toggleDarkMode}
            >
                <div
                    className={`absolute h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-md ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}
                />
            </div>
        </div>
    );
}
