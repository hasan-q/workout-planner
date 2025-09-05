import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../api/tokenService";

const isAuthenticated = () => {
    const token = getAccessToken();

    if (token) {
        return true;
    } else {
        return false;
    }
}

export default function ProtectedRoutes() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
}