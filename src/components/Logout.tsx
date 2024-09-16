import { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { AppContext } from "../AppContext";

type Props = {
  action: () => void;
};

export default function Logout({ action }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer`}
      onClick={action}
    >
      Logout
      <LuLogOut className="text-lg" />
    </div>
  );
}
