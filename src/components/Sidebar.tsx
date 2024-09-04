import { useContext } from "react";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Routes from "./Routes";
import Separator from "./Separator";
import { AppContext } from "../AppContext";

export default function Sidebar() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode, isSidebarOpen, closeSidebar } = ctx;

  return (
    <>
      <nav
        className={`fixed lg:relative top-[calc(0+40px)] left-0 min-h-[calc(100vh-40px)]
 w-72 min-w-72 flex flex-col gap-2 p-4 transition-all duration-300 border-r border-borderColor z-30 transform ${
   isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
 } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <Logo />
        </div>
        <Routes />
        <Separator />
        <DarkMode />
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
