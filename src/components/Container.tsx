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
      className={`p-4 md:rounded-lg md:shadow-customShadow transition-all duration-300  ${
        isDarkMode
          ? "bg-secondaryDark text-lightColor"
          : "bg-primaryColor text-darkColor "
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}
