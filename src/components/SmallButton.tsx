import { ReactNode } from "react";

type Props = {
    className?: string;
    icon: ReactNode;
    action?: () => void;
}

export default function SmallButton({className, icon, action}: Props) {
    return (
        <button className={`p-2 rounded-md transition-all duration-300 hover:bg-hoverColor text-lg text-baseColor ${className}`} onClick={action}>
            {icon}
        </button>
    )
}