import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import MyDay from "./MyDay";
import Important from "./Important";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname === "/" ? null : <Header />}
      <div className="flex min-h-[calc(100vh-48px)]">
        {location.pathname === "/" ? null : <Sidebar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="myday" element={<MyDay />} />
          <Route path="important" element={<Important />} />
        </Routes>
      </div>
    </div>
  );
}
