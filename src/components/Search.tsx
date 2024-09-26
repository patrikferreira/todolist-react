import { IoSearchOutline } from "react-icons/io5";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function Search({ searchValue, onSearchChange }: Props) {
  return (
    <div className={`flex items-center justify-between gap-2 transition-all duration-200 bg-firstColor border rounded-lg px-4 py-2 `}>
      <label htmlFor="search"><IoSearchOutline className="text-secondColor" /></label>
      <input
        type="text"
        placeholder="Search task"
        id="search"
        className="outline-none text-sm bg-firstColor"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
