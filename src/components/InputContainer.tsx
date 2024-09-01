import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

type Props = {
  className?: string;
  placeHolder?: string;
  iconBtn?: React.ReactNode;
  action?: (value: string) => void;
  isSearchMode?: boolean; // Add this prop to distinguish between search and create modes
};

export default function InputContainer({
  className,
  placeHolder,
  iconBtn,
  action,
  isSearchMode = false, // Default to false if not provided
}: Props) {
  const ctx = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    if (isSearchMode && action) {
      action(event.target.value); // Trigger search action on input change if in search mode
    }
  }

  function handleButtonClick() {
    if (!isSearchMode && action) { // Only trigger the action if not in search mode
      action(inputValue);
      setInputValue("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  }

  return (
    <div
      className={`flex py-2 px-4 justify-between items-center rounded-full transition-all duration-300 ${isDarkMode ? 'bg-primaryDark' : 'bg-secondaryColor'} ${className || ""}`}
    >
      <input
        type="text"
        placeholder={placeHolder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`outline-none w-full transition-all duration-300 ${
          isDarkMode ? "bg-primaryDark text-lightColor" : "bg-secondaryColor text-darkColor"
        }`}
      />
      <button onClick={handleButtonClick}>{iconBtn}</button>
    </div>
  );
}
