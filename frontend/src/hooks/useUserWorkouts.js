import { useState, useEffect } from "react";
import { getWorkouts } from "../api/workoutService";

export function useUserWorkouts(limit = null) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            (async () => {
                try {
                    const allWorkouts = await getWorkouts();
                    const startedWorkouts = allWorkouts.filter(workout => workout.date);
                    setWorkouts(limit ? startedWorkouts.slice(0, limit) : startedWorkouts);
                } catch (error) {
                    console.error(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [limit]
    );

    return { workouts, loading, error };
}
