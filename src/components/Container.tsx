import React, { useContext } from "react";
import { AppContext } from "../AppContext";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  return (
    <div
      className={`p-4 shadow-md md:rounded-2xl transition-all duration-300  ${
        isDarkMode
          ? "bg-darkColor text-lightColor border-borderDark"
          : "bg-lightColor text-darkColor border-borderLight"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}
