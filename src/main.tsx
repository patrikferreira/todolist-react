import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Sidebar from "./components/Sidebar.tsx";
import { AppProvider } from "./AppContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <div className="flex">
        <Sidebar />
        <App />
      </div>
    </AppProvider>
  </StrictMode>
);
