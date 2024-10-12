import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Today from "../pages/Today";
import Important from "../pages/Important";
import Notes from "../pages/Notes";
import Sidebar from "../components/Sidebar";

export default function AppRoutes() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  return (
    <div className="flex min-h-screen">
      {location.pathname === "/login" ? null : <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/today" element={<Today />} />
        <Route path="/important" element={<Important />} />
        <Route path="/notes" element={<Notes />} />

        <Route
          path="*"
          element={<Navigate to="/login" state={{ from: location }} replace />}
        />
      </Routes>
    </div>
  );
}
