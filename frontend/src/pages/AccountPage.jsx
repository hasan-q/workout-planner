import { clearTokens } from "../api/tokenService";

return (
    <div className="logout-page">
        <h2>Account Details</h2>
        <p>Username: </p>
        <button onClick={clearTokens}>Logout</button>
    </div>
);