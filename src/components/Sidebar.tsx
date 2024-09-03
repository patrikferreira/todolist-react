import { useContext, useState } from "react";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Routes from "./Routes";
import Separator from "./Separator";
import { AppContext } from "../AppContext";

export default function Sidebar() {
  const ctx = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <>
      <nav
        className={`fixed lg:relative top-0 left-0 h-screen w-72 min-w-72 flex flex-col gap-2 p-4 transition-transform duration-300 border-r border-borderColor z-30 transform ${
          isDarkMode ? "bg-secondaryDark" : "bg-primaryColor"
        } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:translate-x-0`}
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
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
