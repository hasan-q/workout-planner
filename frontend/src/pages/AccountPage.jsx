import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";

export default function AccountPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const username = localStorage.getItem("username")

    return (
        <div className="logout-page">
            <h2>Account Details</h2>
            <p>Username: {username}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
