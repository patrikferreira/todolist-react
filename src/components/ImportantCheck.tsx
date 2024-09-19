import { MdLabelImportantOutline, MdLabelImportant } from "react-icons/md";

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
        <MdLabelImportant className="text-yellow-500 text-2xl" />
      ) : (
        <MdLabelImportantOutline className="text-gray-400 text-2xl" />
      )}
    </div>
  );
}
