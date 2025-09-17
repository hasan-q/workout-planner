import { useState, useEffect } from "react";
import { getWorkouts } from "../api/workoutService";

export default function HistoryPage() {
    const [workouts, setWorkouts] = useState([]);
    const [expandedWorkout, setExpandedWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const toggleExpanded = (id) => {
        // only one workout can be toggled at a time, uses ID
        setExpandedWorkout(expandedWorkout === id ? null : id);
    };
}