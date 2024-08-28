import DarkMode from "./DarkMode";
import Logo from "./Logo";
import Routes from "./Routes";
import Separator from "./Separator";

export default function Sidebar() {
    return (
        <nav className="h-screen w-64 flex flex-col gap-2 bg-primaryColor p-4">
            <Logo />
            <Routes />
            <Separator />
            <DarkMode />
        </nav>
    )
}