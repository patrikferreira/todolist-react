import { useContext } from "react";
import TaskListPage from "./TaskListPage";
import { AppContext } from "../AppContext";

export default function Important() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { isDarkMode } = ctx;
  return (
    <div className={`w-full transition-all duration-300 ${isDarkMode ? "bg-darkColor" : "bg-lightColor"}`}>
      <TaskListPage title="Important" filterImportant={true} />
    </div>
  )
}
