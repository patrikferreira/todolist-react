import { IoIosCheckmark } from "react-icons/io";

type CheckProps = {
  isChecked: boolean;
  action: () => void;
};

export default function Check({ isChecked, action }: CheckProps) {
  return (
    <div
      onClick={action}
      className={`h-5 w-5 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-300 ${
        isChecked
          ? "bg-accentColor border border-accentColor"
          : "bg-transparent border border-base"
      }`}
    >
      <IoIosCheckmark
        className={`text-2xl transition-all duration-300 ${
          isChecked ? "text-lightColor" : "text-transparent"
        }`}
      />
    </div>
  );
}
