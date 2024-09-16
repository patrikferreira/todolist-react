import { useContext } from "react";
import { FaRegMoon } from "react-icons/fa";
import { AppContext } from "../AppContext";

export default function DarkMode() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode, toggleDarkMode } = ctx;

  return (
    <div className="flex justify-between items-center py-2 px-4">
      <div className={`flex gap-2 items-center transition-all duration-300 ${isDarkMode ? "text-lightColor" : "text-darkColor"}`}>
        <FaRegMoon />
        Dark mode
      </div>
      <div
        className={`relative h-5 w-8 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ${
          isDarkMode ? "bg-baseDark" : "bg-baseLight"
        }`}
        onClick={toggleDarkMode}
      >
        <div
          className={`absolute h-3 w-3 shadow-sm rounded-full bg-white transition-transform duration-300 ${
            isDarkMode ? "translate-x-3" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}
