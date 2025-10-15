import { logout } from "../api/authService";

export default function AccountPage() {
    return (
        <div className="logout-page">
            <h2>Account Details</h2>
            <p>Username: </p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
