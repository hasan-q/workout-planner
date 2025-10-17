import "../components/pages.css";
import "../components/dashboard.css";
import { useUserTemplates } from "../hooks/useUserTemplates";
import { useUserWorkouts } from "../hooks/useUserWorkouts";
import { useStartWorkout } from "../utils/workoutUtils";
import { UseViewHistory } from "../utils/historyUtils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const { templates, loadingTemplates } = useUserTemplates(5);
    const { workouts, loadingWorkouts } = useUserWorkouts(5);

    const { handleStartWorkout } = useStartWorkout();
    const { handleViewExpandedWorkout } = UseViewHistory();

    if (loadingTemplates) return <p>Loading Workouts...</p>
    if (loadingWorkouts) return <p>Loading History...</p>

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <div className="dashboard-template-container">
                <h2 className="title-text">Your Planned Workouts</h2>
                {templates.length === 0 ? (
                    <p>You have no templates yet.</p>
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
                <p>Still need: Recent Workouts (fetch first few from history)</p>
                <p>Progress Snapshot: select random exercise, pull up graph of progress</p>
                <p>Quick Actions: New Exercise, New Template, View History (Just Link to pages)</p>
            </div>
            <div>
                <h2 className="title-text">Recent Workouts</h2>
                {workouts.length === 0 ? (
                    <p>You haven't started any workouts yet.</p>
                ) : (
                    <ul className="dashboard-workouts">
                        {workouts.map(workout => (
                            <li
                                key={workout.id}
                                className="dashboard-workout-item"
                            >
                                <h3>{workout.name}</h3>
                                <button 
                                    className="workout-item-view"
                                    onClick={() => handleViewExpandedWorkout(workout.id)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}