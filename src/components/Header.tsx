import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RiMenu5Line } from "react-icons/ri";

export default function Header() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode, openSidebar } = ctx;

  return (
    <div className={`flex border-b z-40 items-center w-full h-10  px-4 md:px-8 transition-all duration-300 ${isDarkMode ? 'bg-darkColor text-lightColor border-b-borderDark' : 'bg-lightColor text-darkColor border-b-borderLight'}`}>
      <button onClick={openSidebar}>
        <RiMenu5Line className="text-2xl" />
      </button>
    </div>
  );
}
