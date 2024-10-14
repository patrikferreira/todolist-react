import Header from "../components/Header";
import TaskListContainer from "../components/TaskListContainer";

export default function Today() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full bg-lightColor animate-fade-in-left transition-all duration-300">
      <Header />
      <div className="overflow-y-auto h-[calc(100vh-100px)]">
        <TaskListContainer />
      </div>
    </div>
  );
}
