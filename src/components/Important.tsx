import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";

export default function Important() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const myDayList = ctx.taskLists.find((list) => list.title === "My Day");

  const importantTasks = myDayList ? myDayList.tasks.filter(task => task.isImportant) : [];

  return (
    <div className={`flex flex-col gap-2 w-full animate-fade-in-left transition-all duration-300 p-4`}>
      <Header title="Important" />
      <TaskListPage
        title="Important Tasks"
        tasks={importantTasks}
        onAddTask={(task) => {
          if (myDayList) {
            ctx.addTask(myDayList.id, task);
          }
        }}
        filterImportant={true}
        listId={myDayList ? myDayList.id : ""}
      />
    </div>
  );
}
