import { FaRegMoon } from "react-icons/fa";
import Switch from "./Switch";

export default function DarkMode() {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex gap-2 items-center text-base">
        <FaRegMoon />
        Dark mode
      </div>
      <Switch />
    </div>
  );
}
