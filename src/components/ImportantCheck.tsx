import { BsStar } from "react-icons/bs";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { MdLabelImportantOutline, MdLabelImportant } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";

type Props = {
  isChecked: boolean;
  action: () => void;
};

export default function ImportantCheck({ isChecked, action }: Props) {
  return (
    <div
      onClick={action}
      className="cursor-pointer flex items-center justify-center"
    >
      {isChecked ? (
        <IoStar className="text-accent text-lg" />
      ) : (
        <IoIosStarOutline className="text-baseColor text-lg" />
      )}
    </div>
  );
}
