import { useContext } from "react";
import MyDay from "./components/MyDay";
import { AppContext } from "./AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Important from "./components/Important";
import Notes from "./components/Notes";
import Header from "./components/Header";

export default function App() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("DarkMode must be used within an AppProvider");
  }

  const { isDarkMode } = ctx;
  return (
    <BrowserRouter>
      <Header />
      <div
        className={`flex min-h-[calc(100vh-40px)]
 ${isDarkMode ? "bg-primaryDark" : "bg-primaryColor"}`}
      >
        <Sidebar />
        <div
          className={`flex w-full p-6 transition-all duration-300 ${
            isDarkMode ? "bg-primaryDark" : "bg-lightColor"
          }`}
        >
          <Routes>
            <Route path="/" element={<MyDay />} />
            <Route path="important" element={<Important />} />
            <Route path="notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
