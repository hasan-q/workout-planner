import "../components/pages.css";
import "../components/dashboard.css";
import { useUserTemplates } from "../hooks/useUserTemplates";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const { templates, loading } = useUserTemplates(5);

    if (loading) return <p>Loading...</p>

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <h2 className="title-text">Your Templates</h2>
            {templates.length === 0 ? (
                <p>You have no templates yet. </p>
            ) : (
                <ul className="dashboard-templates">
                    {templates.map(template => (
                        <li
                            key={template.id}
                            className="dashboard-template-item"
                        >
                            <h3>{template.name}</h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}