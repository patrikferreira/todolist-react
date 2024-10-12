import { ReactNode, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import Popover from "./Popover";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

interface Props {
  id: string;
  path: string;
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  count?: number;
  onClick: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  hasSubMenu: boolean;
}

export default function NavItem({
  id,
  path,
  icon,
  label,
  isSelected,
  count,
  onClick,
  onDelete,
  onEdit,
  hasSubMenu,
}: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <li
      className={`group flex items-center justify-between text-sm rounded-lg transition-all duration-200 relative ${
        isSelected
          ? "bg-focusColor text-accent"
          : "hover:bg-hoverColor text-baseColor"
      } pr-2`}
    >
      <Link
        to={path}
        className="p-2 flex items-center justify-between w-full"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <span
          className={`text-sm mr-2 ${hasSubMenu ? "group-hover:hidden" : ""}`}
        >
          {count ? count : "0"}
        </span>
        {hasSubMenu && (
          <button
            onClick={togglePopover}
            className="hidden text-lg pr-[3px] group-hover:block hover:bg-transparent"
          >
            <CiMenuKebab />
          </button>
        )}
        {isPopoverOpen && (
          <Popover
            onClose={togglePopover}
            className="absolute right-0 top-full"
          >
            <div className="flex flex-col">
              {onEdit && (
                <button
                  onClick={() => {
                    if (onEdit) {
                      onEdit();
                    }
                    togglePopover();
                  }}
                  className="flex gap-2 items-center p-2 transition-all duration-300 hover:bg-hoverColor rounded-lg text-baseColor"
                >
                  <FiEdit />
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete();
                    togglePopover();
                  }}
                  className="flex gap-2 items-center p-2 transition-all duration-300 hover:bg-hoverColor rounded-lg text-baseColor"
                >
                  <GoTrash />
                  Delete
                </button>
              )}
            </div>
          </Popover>
        )}
      </div>
    </li>
  );
}
