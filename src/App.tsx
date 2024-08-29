import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { IoIosAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Task } from "./Types";

export default function App() {
  const ctx = useContext(AppContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  // Definindo o limite máximo de tarefas
  const MAX_TASKS = 10;

  // Função para formatar a data no formato desejado
  const formatDate = (date) => {
    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Obtendo a data atual formatada
  const formattedDate = formatDate(new Date());

  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (newTask.trim() && tasks.length < MAX_TASKS) {
      const newTaskItem: Task = {
        id: tasks.length + 1,
        description: newTask,
        isChecked: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask(""); // Limpa o campo de entrada após adicionar a tarefa
    }
  };

  // Função para alternar o status de conclusão de uma tarefa
  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  // Contador de tarefas restantes para criar
  const remainingTasksCount = MAX_TASKS - tasks.length;

  return (
    <main
      className={`flex gap-4 p-6 w-full h-screen transition-all duration-300 ${
        isDarkMode ? "bg-primaryDark" : "bg-lightColor"
      }`}
    >
      <div className={`h-full w-full flex flex-col justify-between`}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col">
              <div
                className={`text-lg font-semibold transition-all duration-300 ${
                  isDarkMode ? "text-lightColor" : "text-darkColor"
                }`}
              >
                My Day
              </div>
              <div className="text-sm text-base">{formattedDate}</div>
            </div>
            <div
              className={`w-3/4 rounded-lg px-2 transition-all duration-300 flex justify-between items-center ${
                isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
              }`}
            >
              <input
                type="text"
                placeholder="Search task"
                className={`w-full outline-none p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-secondaryDark text-lightColor"
                    : "bg-primaryColor text-darkColor"
                }`}
              />
              <button className="px-2">
                <IoSearch className="text-base" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-base">
                {tasks.length}/{MAX_TASKS} List
              </p>
            </div>
            <ul className="h-full flex flex-col gap-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-secondaryDark text-lightColor"
                      : "bg-primaryColor text-darkColor"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.isChecked}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label className={task.isChecked ? "line-through" : ""}>
                      {task.description}
                    </label>
                  </div>
                  <button>
                    <BiDotsVerticalRounded />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`px-2 rounded-lg flex justify-between transition-all duration-300 ${
            isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
          }`}
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Create new task"
            className={`w-full outline-none p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-secondaryDark text-lightColor"
                : "bg-primaryColor text-darkColor"
            }`}
          />
          <button className="p-2" onClick={handleAddTask}>
            <IoIosAdd className="text-base text-xl" />
          </button>
        </div>
      </div>
    </main>
  );
}
