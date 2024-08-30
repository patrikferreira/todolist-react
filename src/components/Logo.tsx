import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function Logo() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className="flex gap-2 p-2 items-center">
      <img src="/vite.svg" alt="" />
      <p
        className={`text-2xl font-semibold transition-all duration-300 ${
          isDarkMode ? "text-lightColor" : "text-darkColor"
        }`}
      >
        Todolist
      </p>
    </div>
  );
}
