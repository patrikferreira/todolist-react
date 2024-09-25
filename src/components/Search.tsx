import { IoSearchOutline } from "react-icons/io5";
import SmallButton from "./SmallButton";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function Search({ searchValue, onSearchChange }: Props) {
  return (
    <div className={`flex items-center justify-between transition-all duration-200`}>
      <SmallButton icon={<IoSearchOutline />} className="hover:bg-transparent" />
      <input
        type="text"
        placeholder="Search task"
        className="outline-none text-sm"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
