import { useState } from "react";
import { MAX_TASK_LENGTH } from "../Types";
import Button from "./Button";
import { IoAdd } from "react-icons/io5";
import SmallButton from "./SmallButton";
import NoContent from "./NoContent";

type Props = {
    title?: string;
    filterImportant?: boolean;
}

export default function TaskListContainer({title, filterImportant}: Props) {
  const [taskValue, setTaskValue] = useState<string>("");

  function handleAddTask() {}

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center">
        <SmallButton icon={<IoAdd />} />
        <input
          type="text"
          placeholder="Create task"
          className="outline-none p-2 text-sm min-w-fit"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyDown={handleKeyPress}
          maxLength={MAX_TASK_LENGTH}
        />
      </div>
      <div className="h-full">
        <NoContent
          className="h-32 md:h-40"
          img={<img src="/src/assets/todo.svg" className="h-full" alt="" />}
          title="There are no tasks created yet."
        />
      </div>
    </div>
  );
}
