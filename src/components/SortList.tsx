import SmallButton from "./SmallButton";
import { PiSortAscendingLight } from "react-icons/pi";
import { useState, useContext } from "react";
import Popover from "./Popover";
import { AppContext } from "../AppContext";

export default function SortList() {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { setSortBy } = ctx;

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleSortChange(option: string) {
    setSortBy(option);
    togglePopover();
  }

  return (
    <div className="relative">
      <SmallButton
        icon={<PiSortAscendingLight className="text-xl" />}
        action={togglePopover}
      />

      {isPopoverOpen && (
        <Popover onClose={togglePopover} className="absolute right-0">
          <button
            className="flex items-center gap-2 p-2 transition-all duration-300 hover:bg-hoverColor w-full rounded-lg"
            onClick={() => handleSortChange("latest")}
          >
            Latest
          </button>
          <button
            className="flex items-center gap-2 p-2 transition-all duration-300 hover:bg-hoverColor w-full rounded-lg"
            onClick={() => handleSortChange("important")}
          >
            Important
          </button>
        </Popover>
      )}
    </div>
  );
}
