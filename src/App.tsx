import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function App() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode, toggleDarkMode } = ctx;

  return (
    <main
      className={`p-4 w-full h-screen transition-all duration-300 ${
        isDarkMode ? "bg-primaryDark" : "bg-lightColor"
      }`}
    ></main>
  );
}
