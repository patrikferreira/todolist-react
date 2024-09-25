import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";
import { Task } from "../Types";

export default function MyDay() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const myDayList = ctx.taskLists.find((list) => list.title === "My Day");

  if (!myDayList) {
    return <div>No tasks available for My Day</div>;
  }

  const handleAddTask = (task: Task) => {
    ctx.addTask(myDayList.id, task);
  };

  return (
    <div className={`flex flex-col gap-4 w-full animate-fade-in-left transition-all duration-300 p-4`}>
      <Header title="My Day" />
      <TaskListPage
        title="My Day"
        tasks={myDayList.tasks}
        onAddTask={handleAddTask}
        filterImportant={false}
        listId={myDayList.id}
      />
    </div>
  );
}
