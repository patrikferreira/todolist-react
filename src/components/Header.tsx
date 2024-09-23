import { useContext, useState } from "react";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { AppContext } from "../AppContext";
import { TbArrowsSort } from "react-icons/tb";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import SmallButton from "./SmallButton";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [sortPopoverActive, setSortPopoverActive] = useState<boolean>(false);
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  function handleSearch() {
    setSearchActive(!searchActive);
  }

  const { openSidebar } = ctx;

  const handleSortOption = (option: string) => {
    setSortPopoverActive(false);
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SmallButton
            icon={<VscLayoutSidebarLeftOff />}
            action={openSidebar}
            className="md:hidden"
          />
          <p className="text-lg">{title}</p>
        </div>

        <div className="flex items-center relative">
          <SmallButton icon={<IoSearchOutline />} action={handleSearch} />
          <div className="relative">
            <SmallButton
              icon={<TbArrowsSort />}
              action={() => setSortPopoverActive(!sortPopoverActive)}
            />
            {sortPopoverActive && (
              <div className="absolute z-40 overflow-hidden right-0 w-40 bg-lightColor shadow-customShadow rounded-md">
                <button
                  className="block w-full text-xs text-left p-2 hover:bg-hoverColor text-baseColor"
                  onClick={() => handleSortOption("dateAdded")}
                >
                  Date added
                </button>
                <button
                  className="block w-full text-xs text-left p-2 hover:bg-hoverColor text-baseColor"
                  onClick={() => handleSortOption("important")}
                >
                  Important
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className={`flex items-center justify-between rounded-md h-0 w-60 overflow-hidden transition-all duration-200 ${
            searchActive ? "p-4 bg-secondColor" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search task"
            className="outline-none bg-secondColor text-sm"
          />
          <button className="text-baseColor">
            <IoCloseOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
