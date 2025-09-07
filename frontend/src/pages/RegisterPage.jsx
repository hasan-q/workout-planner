import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";

export default function RegisterPage() {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await register({ username, email, password });
            navigate("/dashboard")
        } catch (error) {
            alert("Registration failed, please try again.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="username" placeholder="username" required />
            <input type="email" name="email" placeholder="email" required />
            <input type="password" name="password" placeholder="password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
}
