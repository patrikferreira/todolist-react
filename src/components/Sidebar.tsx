import { useContext, useState } from "react";
import { CiStickyNote } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoAddOutline } from "react-icons/io5";
import { MdLabelImportantOutline, MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const menuItems = [
  {
    id: "myday",
    label: "My Day",
    icon: <FiSun className="text-md" />,
    path: "/myday",
  },
  {
    id: "important",
    label: "Important",
    icon: <MdLabelImportantOutline className="text-md" />,
    path: "/important",
  },
  {
    id: "notes",
    label: "Notes",
    icon: <CiStickyNote className="text-md" />,
    path: "/notes",
  },
];

export default function Sidebar() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string>("myday");

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isSidebarOpen, closeSidebar, tasks } = ctx;

  function handleLogout() {
    navigate("/");
  }

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

  return (
    <>
      <nav
        className={`fixed lg:relative min-h-full left-0 w-72 min-w-72 flex flex-col justify-between p-4 transition-all duration-300 z-30 transform bg-lightColor border-r border-baseLight ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Logo</h1>
            <button className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor">
              <HiOutlineBellAlert className="text-xl text-baseColor" />
            </button>
          </div>

          <div>
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={closeSidebar}
                  className={`flex items-center justify-between text-sm rounded-lg transition-all duration-200 hover:bg-hoverColor pr-2 ${
                    selectedRoute === item.id ? "bg-hoverColor" : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    className="p-2 flex items-center justify-between w-full"
                    onClick={() => setSelectedRoute(item.id)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                  </Link>
                  <div>
                    <span className="text-sm text-baseColor mr-2">{countTasksByCategory(item.id)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">Projects</p>
              <button className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor">
                <IoAddOutline className="text-xl text-baseColor" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-hoverColor"></div>
            <p className="text-sm font-semibold">User</p>
          </div>
          <button
            onClick={handleLogout}
            className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor"
          >
            <MdOutlineLogout className="text-xl text-baseColor" />
          </button>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}
