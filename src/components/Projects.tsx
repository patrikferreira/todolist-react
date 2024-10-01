import { useContext } from "react";
import { AppContext } from "../AppContext";
import Header from "./Header";
import TaskListPage from "./TaskListPage";
import { Task } from "../Types";
import FixedContainer from "./FixedContainer";

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
    <div
      className={`w-full animate-fade-in-left transition-all duration-300 p-4 h-screen`}
    >
      <FixedContainer>
        <Header title={taskList.title} />
        <div className="overflow-y-auto h-[calc(100vh-100px)]">
          <TaskListPage
            title={taskList.title}
            tasks={taskList.tasks}
            onAddTask={handleAddTask}
            filterImportant={false}
            listId={taskList.id}
          />
        </div>
      </FixedContainer>
    </div>
  );
}
