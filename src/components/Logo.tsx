import { useContext } from "react";
import { AppContext } from "../AppContext";


export default function Logo() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className="flex gap-4 p-2 items-center">
      <div className="border-8 border-r-accent h-8 w-8 rounded-full"
      style={{ transform: "rotate(-40deg)" }}>

      </div>
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
