import { useContext } from "react";
import { AppContext } from "../AppContext";
import Logo from "./Logo";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function Header() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { openSidebar, isDarkMode } = ctx;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={`flex z-40 justify-between border-b px-4 lg:px-8 items-center w-full h-12 transition-all duration-300 ${isDarkMode ? "bg-darkColor border-baseDark text-lightColor" : "bg-lightColor border-baseLight text-darkColor"}`}>
      <Logo />
      <Logout action={handleLogout} />
    </div>
  );
}
