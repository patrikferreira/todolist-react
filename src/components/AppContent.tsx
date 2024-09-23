import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import MyDay from "./MyDay";
import Important from "./Important";
import Sidebar from "./Sidebar";
import Notes from "./Notes";

import { useContext } from "react";
import { AppContext } from "../AppContext";
import Projects from "./Projtects";

export default function AppContent() {
  const location = useLocation();
  const ctx = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col bg-lightColor">
      <div className="flex min-h-screen">
        {location.pathname === "/" ? null : <Sidebar />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="myday" element={<MyDay />} />
          <Route path="important" element={<Important />} />
          <Route path="notes" element={<Notes />} />
          {ctx?.taskLists
            .filter(list => list.id !== "myday")
            .map(list => (
              <Route
                key={list.id}
                path={list.id}
                element={<Projects listId={list.id} />}
              />
            ))}
        </Routes>
      </div>
    </div>
  );
}
