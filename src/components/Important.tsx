import React, { useContext, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { AppContext } from "../AppContext";
import Container from "./Container";
import InputContainer from "./InputContainer";
import TaskItem from "./TaskItem";
import DateContainer from "./DateContainer";
import CustomTask from "./CustomTask";
import TaskCompletionChart from "./TaskCompletionChart";

export default function Important() {
  const ctx = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskIdsWithTransition, setTaskIdsWithTransition] = useState<number[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const {
    isDarkMode,
    tasks,
    toggleTaskImportance,
    toggleTaskCompletion,
  } = ctx;

  function handleSearch(value: string) {
    setSearchQuery(value);
  }

  function handleTaskClick(id: number) {
    setSelectedTaskId(id);
  }

  const filteredTasks = tasks
    .filter(task => task.isImportant)
    .filter(task =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => (a.isChecked === b.isChecked ? 0 : a.isChecked ? 1 : -1));

  useEffect(() => {
    if (taskIdsWithTransition.length > 0) {
      const timer = setTimeout(() => {
        setTaskIdsWithTransition([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [taskIdsWithTransition]);

  return (
    <div className="flex w-full gap-6 h-full animate-fade-in-left transition-all duration-300">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between items-center">
            <DateContainer title="Important" className="min-w-40" />
            <InputContainer
              placeHolder="Search task"
              action={handleSearch}
              iconBtn={<IoSearch className="text-base" />}
              className="w-full"
              isSearchMode={true}
            />
          </div>
          <ul className="flex flex-col gap-2 py-2">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isDarkMode={isDarkMode}
                toggleTaskCompletion={toggleTaskCompletion}
                toggleTaskImportance={toggleTaskImportance}
                isNew={taskIdsWithTransition.includes(task.id)}
                isSelected={task.id === selectedTaskId}
                onClick={() => handleTaskClick(task.id)}
              />
            ))}
          </ul>
        </div>
      </Container>

      <div className="flex flex-col gap-6 h-full w-72 min-w-72">
        <Container className="h-full flex flex-col gap-4">
          <h1 className="text-lg font-semibold">Customize Task</h1>
          <CustomTask selectedTaskId={selectedTaskId} />
        </Container>
        <Container>
          <div className="flex justify-center items-center h-full">
            <TaskCompletionChart />
          </div>
        </Container>
      </div>
    </div>
  );
}
