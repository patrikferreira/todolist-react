import { useContext } from "react";
import { AppContext } from "../AppContext";

type Props = {
  title: string;
};

export default function DateContainer({ title }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  const formatDate = (date: any): string => {
    const options: any = {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate: string = formatDate(new Date() as any);

  return (
    <div className="flex flex-col">
      <div
        className={`text-lg font-semibold transition-all duration-300 ${
          isDarkMode ? "text-lightColor" : "text-darkColor"
        }`}
      >
        {title}
      </div>
      <div className="text-sm text-base">{formattedDate}</div>
    </div>
  );
}
