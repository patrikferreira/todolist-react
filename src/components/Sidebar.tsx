import { useContext } from "react";
import DarkMode from "./DarkMode";
import Routes from "./Routes";
import Separator from "./Separator";
import { AppContext } from "../AppContext";
import Settings from "./Settings";

export default function Sidebar() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode, isSidebarOpen, closeSidebar } = ctx;

  return (
    <>
      <nav
        className={`fixed shadow-md lg:relative min-h-full  left-0
 w-72 min-w-72 flex flex-col gap-2 p-4 transition-all duration-300 z-30 transform  ${
   isDarkMode
     ? "bg-darkColor "
     : "bg-lightColor "
 } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0`}
      >
        <Routes />
        <Separator />
        <DarkMode />
        <Settings />
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
