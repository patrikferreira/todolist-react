import { useContext } from "react";
import MyDay from "./components/MyDay";
import { AppContext } from "./AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Important from "./components/Important";
import Header from "./components/Header";
import SettingsPage from "./components/SettingsPage";

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
        className={`flex min-h-[calc(100vh-40px)]`}
      >
        <Sidebar />
        <div
          className={`flex w-full md:p-4 transition-all duration-300 ${
            isDarkMode ? "bg-baseDark" : "bg-baseLight"
          }`}
        >
          <Routes>
            <Route path="/" element={<MyDay />} />
            <Route path="important" element={<Important />} />
            <Route path="settingspage" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
