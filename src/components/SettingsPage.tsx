import { useContext } from "react";
import { AppContext } from "../AppContext";
import Check from "../components/Check";

export default function SettingsPage() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { isCapitalize, toggleCapitalize, isDarkMode } = ctx;

  return (
    <div className="flex w-full gap-4 p-4 h-full animate-fade-in-left transition-all duration-300">
      <div
        className={`transition-all duration-300 flex flex-col gap-4 ${
          isDarkMode ? "text-lightColor" : "text-darkColor"
        }`}
      >
        <h2 className="text-xl font-semibold">Settings</h2>

        <div className="flex items-center gap-2">
          {/* Componente de Check */}
          <Check isChecked={isCapitalize} action={toggleCapitalize} />
          {/* Transformando o parágrafo em label com onClick que chama a mesma ação */}
          <p onClick={toggleCapitalize} className="cursor-pointer">
            Capitalize Tasks
          </p>
        </div>
      </div>
    </div>
  );
}
