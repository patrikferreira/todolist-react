import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function Settings() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("Settings must be used within an AppProvider");
  }

  const { isDarkMode, selectedRoute, setSelectedRoute, closeSidebar, closeRightPanel } = ctx;

  const handleMenuItemClick = () => {
    setSelectedRoute("settingspage");
    closeSidebar();
    closeRightPanel();
  };

  return (
    <li className="list-none">
      <Link
        to="/settingspage"
        className={`flex items-center justify-between gap-2 py-2 px-4 cursor-pointer rounded-md transition-all duration-300 ${
          selectedRoute === "settingspage"
            ? isDarkMode
              ? "bg-baseDark text-lightColor shadow-md"
              : "bg-baseLight text-darkColor"
            : "text-base"
        }`}
        onClick={handleMenuItemClick}
      >
        <div className="flex gap-2 items-center font-semibold">
          <IoSettingsOutline className="text-lg" />
          <p>Settings</p>
        </div>
      </Link>
    </li>
  );
}
