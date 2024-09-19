import { useContext } from "react";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { AppContext } from "../AppContext";
import { TbArrowsSort } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { openSidebar } = ctx;

  return (
    <div className={`flex justify-between items-center  w-full p-4`}>
      <div className="flex items-center gap-2">
        <button
          className="lg:hidden transition-all duration-300 p-2 rounded-md hover:bg-hoverColor"
          onClick={openSidebar}
        >
          <VscLayoutSidebarLeftOff className="text-xl text-baseColor" />
        </button>
        <p className="text-lg">{title}</p>
      </div>

      <div className="flex items-center">
        <button className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor">
          <IoSearchOutline className="text-xl text-baseColor" />
        </button>
        <button className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor">
          <TbArrowsSort className="text-xl text-baseColor" />
        </button>
        <button className="transition-all duration-300 p-2 rounded-md hover:bg-hoverColor">
          <div className="h-5 w-5 rounded-full border-4 border-r-baseColor">

          </div>
        </button>
      </div>
    </div>
  );
}
