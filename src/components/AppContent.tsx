import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import TaskListContainer from "./TaskListContainer";
import Projects from "./Projects";
import ProtectedRoute from "./ProtectedRoute";

export default function AppContent() {
  const location = useLocation();
  const ctx = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col bg-lightColor">
      <div className="flex min-h-screen">
        {location.pathname === "/" ? null : <Sidebar />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="myday"
            element={
              <ProtectedRoute>
                <TaskListContainer title="My Day" filterImportant={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="important"
            element={
              <ProtectedRoute>
                <TaskListContainer title="Important" filterImportant={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          {ctx?.taskLists
            .filter((list) => list.id !== "myday")
            .map((list) => (
              <Route
                key={list.id}
                path={list.id}
                element={
                  <ProtectedRoute>
                    <Projects listId={list.id} />
                  </ProtectedRoute>
                }
              />
            ))}
          <Route path="*" element={<Navigate to="/myday" />} />
        </Routes>
      </div>
    </div>
  );
}
