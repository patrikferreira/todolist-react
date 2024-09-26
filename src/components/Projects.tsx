import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";
import { Task } from "../Types";

interface ProjectsProps {
  listId: string;
}

export default function Projects({ listId }: ProjectsProps) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const taskList = ctx.taskLists.find((list) => list.id === listId);

  if (!taskList) {
    return <div>No tasks available for this project</div>;
  }

  const handleAddTask = (task: Task) => {
    ctx.addTask(taskList.id, task);
  };

  return (
    <div className={`flex flex-col gap-2 w-full animate-fade-in-left transition-all duration-300 p-4`}>
      <Header title={taskList.title} />
      <TaskListPage
        title={taskList.title}
        tasks={taskList.tasks}
        onAddTask={handleAddTask}
        filterImportant={false}
        listId={taskList.id}
      />
    </div>
  );
}
