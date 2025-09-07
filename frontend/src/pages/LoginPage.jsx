import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../api/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed, please try again.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="email" required />
            <input type="password" name="password" placeholder="password" required />
            <button type="submit">Login</button>
        </form>
    );
}