import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RiMenu5Line } from "react-icons/ri";
import Logo from "./Logo";

export default function Header() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode, openSidebar } = ctx;

  return (
    <div className={`flex z-40 items-center w-full h-10  px-4 md:px-8 transition-all duration-300 bg-accent text-lightColor`}>
      <button onClick={openSidebar} className="flex items-center gap-2">
        <RiMenu5Line className="text-2xl" />
        <Logo />
      </button>
    </div>
  );
}
