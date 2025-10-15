import "../components/pages.css";
import { useUserTemplates } from "../hooks/useUserTemplates";

export default function Dashboard() {

    const username = localStorage.getItem("username");
    const { templates, loading } = useUserTemplates(5);

    if (loading) return <p>Loading...</p>

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <h2 className="title-text">Your Templates</h2>
            
        </div>
    );
}