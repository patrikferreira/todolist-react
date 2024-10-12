import { CiStickyNote } from "react-icons/ci";
import { GoSun } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import NavItem from "./NavItem";
import { ReactNode } from "react";

type MenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
};

type Props = {
  selectedRoute: string;
  countTasksByCategory?: (category: string) => number;
  closeSidebar: () => void;
};

export default function NavDefault({
  selectedRoute,
  countTasksByCategory,
  closeSidebar,
}: Props) {
  const menuItems: MenuItem[] = [
    {
      id: "today",
      label: "My Day",
      icon: <GoSun className="text-lg" />,
      path: "/today",
    },
    {
      id: "important",
      label: "Important",
      icon: <IoIosStarOutline className="text-lg" />,
      path: "/important",
    },
    {
      id: "notes",
      label: "Notes",
      icon: <CiStickyNote className="text-lg" />,
      path: "/notes",
    },
  ];

  return (
    <div>
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            path={item.path}
            icon={item.icon}
            label={item.label}
            isSelected={selectedRoute === item.path}
            hasSubMenu={false}
            onClick={() => {
              closeSidebar();
            }}
          />
        ))}
      </ul>
    </div>
  );
}
