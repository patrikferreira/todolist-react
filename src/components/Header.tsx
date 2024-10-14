import { useContext, useState } from "react";
import SmallButton from "./SmallButton";
import { UserContext } from "../store/UserContext";
import { RiMenuSearchLine } from "react-icons/ri";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { TbArrowsDownUp } from "react-icons/tb";
import { PiArrowsDownUpFill } from "react-icons/pi";

type Props = {
  important?: boolean;
};

export default function Header({ important }: Props) {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an UserProvider");
  }

  const { user } = ctx;

  function formatDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    return `It's ${weekday}, ${day} ${month} ${year}`;
  }

  return (
    <div className="flex justify-between items-start w-full">
      <div className="flex items-start gap-2">
        <SmallButton icon={<VscLayoutSidebarLeftOff />} className="md:hidden" />
        {important ? (
          <h2 className="text-lg">Important Tasks 🚀</h2>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-lg">{`Hello, ${user?.name} 👋`}</h2>
            <p className="text-sm text-secondColor">{formatDate()}</p>
          </div>
        )}
      </div>
      <SmallButton icon={<PiArrowsDownUpFill className="" />} />
    </div>
  );
}
