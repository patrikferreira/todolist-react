import { useContext } from "react";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Routes from "./Routes";
import Separator from "./Separator";
import { AppContext } from "../AppContext";

export default function Sidebar() {
    const ctx = useContext(AppContext)

    if (!ctx) {
        throw new Error("DarkMode must be used within an AppProvider");
    }

    const { isDarkMode } = ctx;

    return (
        <nav className={`h-screen w-64 flex flex-col gap-2 shadow-md p-4 transition-all duration-300 ${isDarkMode ? 'bg-secondaryDark' : 'bg-primaryColor'}`}>
            <Logo />
            <Routes />
            <Separator />
            <DarkMode />
        </nav>
    )
}