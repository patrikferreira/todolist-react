import { useContext, useState } from "react";
import Logo from "./Logo";
import SmallButton from "./SmallButton";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import Popover from "./Popover";
import NoContent from "./NoContent";
import NavDefault from "./NavDefault";
import { useLocation, useNavigate } from "react-router-dom";
import User from "./User";
import { UserContext } from "../store/UserContext";
import { PiArrowsLeftRight } from "react-icons/pi";

export default function Sidebar() {
  const ctx = useContext(UserContext);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { user } = ctx;

  function countTasksByCategory(category: string) {}
  return (
    <>
      <nav
        className={`fixed md:relative min-h-full left-0 min-w-72 flex-shrink-0 flex flex-col justify-between p-4 transition-all duration-300 z-30 bg-firstColor text-secondColor ${
          ctx.isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Logo smallSize={true} />
            <div className="relative">
              <SmallButton
                icon={<HiOutlineBellAlert />}
                action={() => setIsNotificationsOpen(!isNotificationsOpen)}
              />
              {isNotificationsOpen && (
                <Popover
                  onClose={() => setIsNotificationsOpen(false)}
                  className="absolute right-0 md:left-0"
                >
                  <NoContent
                    className="w-36"
                    img={
                      <img
                        src="/src/assets/building.svg"
                        className="h-full"
                        alt=""
                      />
                    }
                    title="Building"
                  />
                </Popover>
              )}
              <SmallButton
                icon={<VscLayoutSidebarLeftOff />}
                className="md:hidden"
                action={ctx.closeSidebar}
              />
            </div>
          </div>

          <NavDefault
            selectedRoute={location.pathname}
            closeSidebar={ctx.closeSidebar}
          />
        </div>

        <User user={user} />
      </nav>
      {ctx.isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={ctx.closeSidebar}
        ></div>
      )}
    </>
  );
}
