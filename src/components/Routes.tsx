import { useContext, useEffect } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";

export default function Routes() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("Routes must be used within an AppProvider");
  }

  const {
    selectedRoute,
    setSelectedRoute,
    isDarkMode,
    tasks,
    closeSidebar,
    closeRightPanel,
  } = ctx;

  const location = useLocation();

  useEffect(() => {
    const path =
      location.pathname === "/myday" ? "myday" : location.pathname.replace("/", "");
    setSelectedRoute(path);
  }, [location.pathname, setSelectedRoute]);

  function countTasksByCategory(category: string) {
    switch (category) {
      case "myday":
        return tasks.length;
      case "important":
        return tasks.filter((task) => task.isImportant).length;
      default:
        return 0;
    }
  }

  const menuItems = [
    { id: "myday", label: "My Day", icon: <MdOutlineWbSunny />, path: "/myday" },
    {
      id: "important",
      label: "Important",
      icon: <FaRegStar />,
      path: "/important",
    },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setSelectedRoute(itemId);
    closeSidebar();
    closeRightPanel();
  };

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.id} className="list-none">
            <Link
              to={item.path}
              className={`flex items-center py-2 px-4 justify-between gap-2 cursor-pointer rounded-md transition-all duration-300
                ${selectedRoute === item.id
                  ? isDarkMode
                    ? "bg-baseDark text-lightColor"
                    : "bg-baseLight text-darkColor"
                  : isDarkMode
                    ? "text-lightColor"
                    : "text-darkColor"
                }`}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <div className="flex gap-2 items-center">
                {item.icon}
                {item.label}
              </div>
              <span className="ml-2 text-sm font-medium">
                {countTasksByCategory(item.id)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
