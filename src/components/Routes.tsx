import React, { useContext, useEffect } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { AppContext } from "../AppContext";
import { FaRegStar } from "react-icons/fa";

export default function Routes() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("Routes must be used within an AppProvider");
  }

  const { selectedRoute, setSelectedRoute, isDarkMode, tasks } = ctx;
  const [selected, setSelected] = React.useState<string>(selectedRoute);

  useEffect(() => {
    setSelectedRoute(selected);
  }, [selected, setSelectedRoute]);

  function countTasksByCategory(category: string) {
    switch (category) {
      case "myDay":
        return tasks.length;
      case "important":
        return tasks.filter((task) => task.isImportant).length;
      default:
        return 0;
    }
  }

  const menuItems = [
    { id: "myDay", label: "My Day", icon: <MdOutlineWbSunny /> },
    { id: "important", label: "Important", icon: <FaRegStar /> },
    { id: "notes", label: "Notes", icon: <CgNotes /> },
  ];

  return (
    <div>
      <ul className="flex flex-col py-2 gap-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between gap-2 py-2 px-4 cursor-pointer rounded-lg transition-all duration-300 ${
              selected === item.id
                ? isDarkMode
                  ? "bg-primaryDark text-lightColor shadow-sm"
                  : "bg-secondaryColor text-darkColor shadow-sm"
                : "bg-transparent text-base"
            }`}
            onClick={() => setSelected(item.id)}
          >
            <div className="flex gap-2 items-center">
              {item.icon}
              {item.label}
            </div>
            <span className="ml-2 text-sm font-medium">
              {countTasksByCategory(item.id)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
