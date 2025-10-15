import "../components/pages.css";
import "../components/dashboard.css";
import { useUserTemplates } from "../hooks/useUserTemplates";
import { useStartWorkout } from "../utils/workoutUtils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const { templates, loading } = useUserTemplates(5);

    const { handleStartWorkout } = useStartWorkout();

    if (loading) return <p>Loading...</p>

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <div className="dashboard-template-container">
                <h2 className="title-text">Your Workouts</h2>
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
                                <button 
                                    className="template-item-start"
                                    onClick={() => handleStartWorkout(template)}
                                >
                                    Start Workout
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>View all <Link to="/workouts"className="link">Workouts</Link></p>
            </div>
        </div>
    );
}