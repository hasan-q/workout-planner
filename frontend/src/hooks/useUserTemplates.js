import { useState, useEffect } from "react";
import { getWorkouts } from "../api/workoutService";

export function useUserTemplates(limit = null) {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            (async () => {
                try {
                    const allWorkouts = await getWorkouts();
                    const templates = allWorkouts.filter(workout => !workout.date);
                    templates.reverse();
                    setTemplates(limit ? templates.slice(0, limit) : templates);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [limit]
    );

    return { templates, loading, error };
}
