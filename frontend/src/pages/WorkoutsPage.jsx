import { useState, useEffect } from "react";
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../api/workoutService";
import WorkoutTemplateForm from "../components/templates/WorkoutTemplateForm";
import WorkoutTemplateList from "../components/templates/WorkoutTemplateList";

export default function WorkoutsPage() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(
        () => {
            (async () => {
                try {
                    const allWorkouts = await getWorkouts();
                    const templates = allWorkouts.filter(workout => !workout.date);
                    setTemplates(templates);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, []
    );

    
}