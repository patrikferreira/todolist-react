import React, { useContext, useEffect } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { AppContext } from "../AppContext"; // Certifique-se de usar o contexto correto

export default function Routes() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("Routes must be used within an AppProvider");
  }

  const { selectedRoute, setSelectedRoute, isDarkMode } = ctx;
  const [selected, setSelected] = React.useState<string>(selectedRoute);

  useEffect(() => {
    setSelectedRoute(selected);
  }, [selected, setSelectedRoute]);

  const menuItems = [
    { id: "myDay", label: "My Day", icon: <MdOutlineWbSunny /> },
    { id: "projects", label: "Projects", icon: <GrProjects /> },
    { id: "notes", label: "Notes", icon: <CgNotes /> },
  ];

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg transition-all duration-300 ${
              selected === item.id
                ? isDarkMode
                  ? "bg-primaryDark text-lightColor"
                  : "bg-secondaryColor text-darkColor"
                : "bg-transparent text-base"
            }`}
            onClick={() => setSelected(item.id)}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
