import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../AppContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskCompletionChart() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("TaskCompletionChart must be used within an AppProvider");
  }

  const { tasks } = ctx;

  const completedTasks = tasks.filter(task => task.isChecked).length;
  const totalTasks = tasks.length;
  const uncompletedTasks = totalTasks - completedTasks;

  const data = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "Task Completion",
        data: [completedTasks, uncompletedTasks],
        backgroundColor: ["#563d7c", "#ebebeb57"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: ${percentage}`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="w-56 ">
      <Doughnut data={data} options={options} />
      <div className="flex flex-col items-start gap-2 mt-4">
        {/* Legendas personalizadas em coluna */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ebebeb]"></div>
          <span>Uncompleted</span>
        </div>
      </div>
    </div>
  );
}
