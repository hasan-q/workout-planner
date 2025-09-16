import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, createWorkout, deleteWorkout, createWorkoutEntry, createExerciseSet } from "../api/workoutService";
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
                    console.log("All workouts:", allWorkouts);
                    const templates = allWorkouts.filter(workout => !workout.date);
                    console.log("templates after filtering by date:", templates);
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

    const handleStartWorkout = async (template) => {
        const newWorkout = await createWorkout({
            name: template.name,
            date: new Date().toISOString().split("T")[0]
        });

        for (let i = 0; i < template.workoutEntries.length; i++) {
            const entry = template.workoutEntries[i];

            const createdEntry = await createWorkoutEntry(newWorkout.id, {
                exerciseId: entry.exercise.id,
                notes: entry.notes || ""
            });

            for (let j = 0; j < entry.sets.length; j++) {
                const set = entry.sets[j];

                const createdSet = await createExerciseSet(createdEntry.id, {
                    setNumber: set.setNumber,
                    reps: set.reps,
                    weight: set.weight
                });
            }
        }

        navigate(`/workouts/${newWorkout.id}`);
    };

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