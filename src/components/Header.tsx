import { useContext, useState } from "react";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { AppContext } from "../AppContext";
import { TbArrowsSort } from "react-icons/tb";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import SmallButton from "./SmallButton";

type Props = {
  title?: string;
};

export default function Header({ title }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { openSidebar } = ctx;

  return (
    <div className="flex items-center gap-2">
      <SmallButton
        icon={<VscLayoutSidebarLeftOff />}
        action={openSidebar}
        className="md:hidden"
      />
      <p className="text-lg">{title}</p>
    </div>
  );
}
