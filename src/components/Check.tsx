import { IoIosCheckmark } from "react-icons/io";

type Props = {
  isChecked: boolean;
  action: () => void;
};

export default function Check({ isChecked, action }: Props) {
  return (
    <div
      onClick={action}
      className={`h-4 w-4 rounded-md flex items-center justify-center ${
        isChecked ? "bg-accent border border-accent" : "border border-base"
      }`}
    >
      <IoIosCheckmark
        className={`text-lg ${
          isChecked ? "text-lightColor" : "text-transparent"
        }`}
      />
    </div>
  );
}
