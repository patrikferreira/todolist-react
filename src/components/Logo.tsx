import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RxBoxModel } from "react-icons/rx";


export default function Logo() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div className={`flex gap-2 items-center`}>
      <RxBoxModel className="text-3xl" />
      <h1
        className={`text-xl font-semibold`}
      >
        JustDO
      </h1>
    </div>
  );
}
