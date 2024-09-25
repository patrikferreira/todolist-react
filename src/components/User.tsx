import { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import SmallButton from "./SmallButton";
import { MdKeyboardArrowRight } from "react-icons/md";
import Popover from "./Popover";
import { IoIosLogOut, IoIosStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "./Modal";
import UnderConstruction from "./UnderConstruction";
import Plan from "./Plan";

type Props = {
  name: string;
};

export default function User({ name }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const navigate = useNavigate();

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function handleLogout() {
    navigate("/");
  }

  function openModal(title: string) {
    setModalTitle(title);
    setIsPopoverOpen(false);
  }

  function closeModal() {
    setModalTitle(null);
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
            className="absolute right-0 bottom-full rounded-lg w-60"
          >
            <div className="flex flex-col min-w-max">
  
                <button
                  onClick={() => openModal(name)}
                  className="flex items-center w-full rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor"
                >
                  <PiUserLight />
                  <p className="text-sm">{name}</p>
                </button>
                <button
                  onClick={() => openModal("Upgrade")}
                  className="flex items-center justify-between rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor"
                >
                  <div className="flex gap-2 items-center">
                    <IoIosStarOutline className="text-yellow-300" />
                    Upgrade
                  </div>
                  <Plan plan="Basic" />
                </button>
                <button
                  onClick={() => openModal("Settings")}
                  className="flex items-center rounded-lg gap-2 p-2 transition-all duration-300 hover:bg-hoverColor"
                >
                  <IoSettingsOutline />
                  Settings
                </button>
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
          </Popover>
        )}

        {modalTitle && (
          <Modal title={modalTitle} onClose={closeModal}>
            <UnderConstruction />
          </Modal>
        )}
      </div>
    </div>
  );
}
