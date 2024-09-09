import { useContext } from "react";
import { AppContext } from "../AppContext";


export default function Logo() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className="flex gap-2 items-center">
      <h1
        className={`text-xl font-semibold transition-all duration-300 text-lightColor`}
      >
        Daily Tasks
      </h1>
    </div>
  );
}
