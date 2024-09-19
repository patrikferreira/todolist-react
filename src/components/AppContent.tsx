import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import MyDay from "./MyDay";
import Important from "./Important";
import Sidebar from "./Sidebar";

export default function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* {location.pathname === "/" ? null : <Header />} */}
      <div className="flex min-h-screen">
        {location.pathname === "/" ? null : <Sidebar />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="myday" element={<MyDay />} />
          <Route path="important" element={<Important />} />
        </Routes>
      </div>
    </div>
  );
}
