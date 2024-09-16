import { useContext } from "react";
import { AppContext } from "../AppContext";
import CustomTask from "./CustomTask";
import TaskCompletionChart from "./TaskCompletionChart";
import { IoIosClose } from "react-icons/io";

export default function RightPanel({
  selectedTaskId,
}: {
  selectedTaskId: number | null;
}) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode, isRightPanelOpen, closeRightPanel } = ctx;

  return (
    <div
      className={`${isDarkMode ? "bg-primaryDark" : "bg-lightColor"} ${
        isRightPanelOpen
          ? "flex animate-fade-in-left transition-all duration-300"
          : "hidden"
      } md:flex flex-col md:gap-4 h-full w-full md:w-72 min-w-72 fixed md:relative md:p-0 top-0 right-0 md:bg-transparent z-50 transition-all duration-300`}
    >
      <div className="flex flex-col gap-4 h-1/2 md:h-full">
        <div className="flex justify-between items-center">
          <h2
            className={`text-xl font-semibold transition-all duration-300 ${
              isDarkMode ? "text-lightColor" : "text-darkColor"
            }`}
          >
            Customize Task
          </h2>
          <button onClick={closeRightPanel} className="md:hidden"><IoIosClose className="text-3xl" /></button>
        </div>
        <CustomTask selectedTaskId={selectedTaskId} />
      </div>
      <div className="h-1/2 md:h-min border-2 border-transparent  hover:border-borderDark">
        <div className="flex justify-center items-center  rounded-2xl h-full">
          <TaskCompletionChart />
        </div>
      </div>
    </div>
  );
}
