import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";

type Props = {
    children: ReactNode;
}

export default function ProtectedRoute({children}: Props) {
    const token = localStorage.getItem("token");
    const location = useLocation();
    if(!token) {
        return <Navigate to="/" replace />;
    }
    return children;
}