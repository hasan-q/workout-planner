import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteWorkout, getWorkouts } from "../api/workoutService";
import HistoryList from "../components/HistoryList";

export default function HistoryPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // If we navigated from dashboard: we have expandedId
    const expandedId = location.state?.expandedId ?? null;

    // Later: Replace this with hook
    useEffect(
        () => {
            (async () => {
                try {
                    const allWorkouts = await getWorkouts();
                    const startedWorkouts = allWorkouts.filter(workout => workout.date);
                    setWorkouts(startedWorkouts);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, []
    );

    const handleDeleteWorkout = async (id) => {
        await deleteWorkout(id);
        const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
        setWorkouts(updatedWorkouts);
    }

    return (
        <div className="history-page">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <HistoryList
                    workouts={workouts}
                    expandedId={expandedId}
                    onDelete={handleDeleteWorkout}
                />
            )}
        </div>
    );
}