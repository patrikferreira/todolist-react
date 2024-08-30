import { useContext } from "react";
import MyDay from "./components/MyDay";
import { AppContext } from "./AppContext";

export default function App() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;
  return (
    <main
      className={`p-6 w-full transition-all duration-300 ${
        isDarkMode ? "bg-primaryDark" : "bg-lightColor"
      }`}
    >
      <MyDay />
    </main>
  );
}
