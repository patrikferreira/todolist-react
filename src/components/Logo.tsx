import { useContext } from "react";
import { AppContext } from "../AppContext";
import { BsCheckAll } from "react-icons/bs";


export default function Logo() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className="flex gap-2 py-2 px-4 items-center">
      <h1
        className={`text-2xl font-semibold transition-all duration-300 ${
          isDarkMode ? "text-lightColor" : "text-darkColor"
        }`}
      >
        Daily Tasks
      </h1>
    </div>
  );
}
