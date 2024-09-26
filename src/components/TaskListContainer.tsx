import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";
import { Task } from "../Types";

type Props = {
  title: string;
  filterImportant: boolean;
}

export default function TaskListContainer({ title, filterImportant }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const myDayList = ctx.taskLists.find((list) => list.title === "My Day");

  const filteredTasks = myDayList
    ? (filterImportant
        ? myDayList.tasks.filter(task => task.isImportant)
        : myDayList.tasks)
    : [];

  const handleAddTask = (task: Task) => {
    if (myDayList) {
      ctx.addTask(myDayList.id, task);
    }
  };

  return (
    <div className={`flex flex-col gap-4 w-full animate-fade-in-left transition-all duration-300 p-4`}>
      <Header title={title} />
      <TaskListPage
        title={title}
        tasks={filteredTasks}
        onAddTask={handleAddTask}
        filterImportant={filterImportant}
        listId={myDayList ? myDayList.id : ""}
      />
    </div>
  );
}
