import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function Separator() {
  const ctx = useContext(AppContext)

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;
  return <div className={`w-full h-[0.5px] transition-all duration-300 ${isDarkMode ? "bg-baseDark" : "bg-baseLight"}`}></div>;
}
