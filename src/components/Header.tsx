import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RiMenu5Line } from "react-icons/ri";

export default function Header() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { openSidebar } = ctx;

  return (
    <div className="flex z-40 items-center w-full bg-accent h-10 px-8">
      <button onClick={openSidebar}>
        <RiMenu5Line className="text-2xl text-white" />
      </button>
    </div>
  );
}
