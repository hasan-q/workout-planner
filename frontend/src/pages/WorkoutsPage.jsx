import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, createWorkout, deleteWorkout } from "../api/workoutService";
import { useStartWorkout } from "../utils/workoutUtils";
import WorkoutTemplateForm from "../components/templates/WorkoutTemplateForm";
import WorkoutTemplateList from "../components/templates/WorkoutTemplateList";

export default function WorkoutsPage() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    const handleCreateTemplate = async (templateData) => {
        const res = await createWorkout(templateData);
        setTemplates([...templates, res]);
    };

    const handleUpdateTemplate = async (templateData) => {
        // navigate to the workout detail page to edit a workout template
        navigate(`/workouts/${templateData.id}`);
    }

    const handleDeleteTemplate = async (id) => {
        await deleteWorkout(id);
        const updatedTemplates = templates.filter((template) => template.id !== id);
        setTemplates(updatedTemplates);
    }

    const { handleStartWorkout } = useStartWorkout();

    return (
        <div className="Workouts">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <WorkoutTemplateForm onSubmit={handleCreateTemplate} />
                    <WorkoutTemplateList
                        templates={templates}
                        onStart={handleStartWorkout}
                        onEdit={handleUpdateTemplate}
                        onDelete={handleDeleteTemplate}
                    />
                </>
            )}
        </div>
    );
}