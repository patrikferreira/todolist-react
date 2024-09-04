import { useContext } from "react";
import { AppContext } from "../AppContext";
import Container from "./Container";
import CustomTask from "./CustomTask";
import TaskCompletionChart from "./TaskCompletionChart";

export default function RightPanel({
  selectedTaskId,
}: {
  selectedTaskId: number | null;
}) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className="hidden md:flex flex-col gap-6 h-full w-72 min-w-72">
      <Container className="h-full flex flex-col gap-4">
        <h1
          className={`text-lg font-semibold transition-all duration-300 ${
            isDarkMode ? "text-lightColor" : "text-darkColor"
          }`}
        >
          Customize Task
        </h1>
        <CustomTask selectedTaskId={selectedTaskId} />
      </Container>
      <Container>
        <div className="flex justify-center items-center h-full">
          <TaskCompletionChart />
        </div>
      </Container>
    </div>
  );
}
