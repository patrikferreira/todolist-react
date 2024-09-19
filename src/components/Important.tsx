import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";

export default function Important() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  return (
    <div className={`flex flex-col gap-2 w-full animate-fade-in-left transition-all duration-300`}>
      <Header title="Important" />
      <TaskListPage filterImportant={true} />
    </div>
  )
}
