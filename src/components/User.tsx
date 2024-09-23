import { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import SmallButton from "./SmallButton";
import { MdKeyboardArrowRight } from "react-icons/md";
import Popover from "./Popover"; // Componente Popover já existente
import { IoIosLogOut, IoIosStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {
  name: string;
};

export default function User({ name }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-focusColor flex items-center justify-center">
          <PiUserLight className="text-xl" />
        </div>
        <p className="text-sm">{name}</p>
      </div>

      <div className="relative">
        <SmallButton icon={<MdKeyboardArrowRight />} action={togglePopover} />

        {isPopoverOpen && (
          <Popover
            onClose={togglePopover}
            className="absolute right-0 bottom-full bg-white shadow-lg rounded-lg w-60"
          >
            <div className="flex flex-col min-w-max">
              <div className="border-b p-1 w-full flex">
                <button className="flex items-center w-full rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor">
                <PiUserLight />
                <p className="text-sm">{name}</p>
                </button>
              </div>
              <div className="w-full flex flex-col p-1">
                <button className="flex items-center justify-between rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor">
                  <div className="flex gap-2 items-center">
                  <IoIosStarOutline className="text-yellow-300" />
                  Upgrade
                  </div>
                  <span className="text-xs p-1 bg-focusColor rounded-lg italic">Basic</span>
                </button>
                <button className="flex items-center rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor">
                  <IoSettingsOutline />
                  Settings
                </button>
              </div>
              <div className="border-t p-1 w-full flex">
                <button
                  onClick={() => {
                    handleLogout();
                    togglePopover();
                  }}
                  className="flex gap-2 items-center p-2 transition-all duration-300 hover:bg-hoverColor rounded-lg text-baseColor w-full"
                >
                  <IoIosLogOut />
                  Logout
                </button>
                </div>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
}
