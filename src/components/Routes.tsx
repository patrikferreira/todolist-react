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
      location.pathname === "/" ? "myDay" : location.pathname.replace("/", "");
    setSelectedRoute(path);
  }, [location.pathname, setSelectedRoute]);

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
    { id: "myDay", label: "My Day", icon: <MdOutlineWbSunny />, path: "/" },
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
      <ul className="flex flex-col py-2 gap-2">
        {menuItems.map((item) => (
          <li key={item.id} className="list-none">
            <Link
              to={item.path}
              className={`flex items-center justify-between gap-2 py-2 px-4 cursor-pointer rounded-md transition-all duration-300 ${
                selectedRoute === item.id
                  ? isDarkMode
                    ? "bg-baseDark text-lightColor shadow-md"
                    : "bg-baseLight text-darkColor"
                  : "text-base"
              }`}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <div className="flex gap-2 items-center font-semibold">
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
