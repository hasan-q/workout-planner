import { useState, useEffect } from "react";
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout, createWorkoutEntry, createExerciseSet } from "../api/workoutService";
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

    const handleCreateTemplate = async (templateData) => {
        const res = await createWorkout(templateData);
        setTemplates([...templates, res]);
    };

    const handleUpdateTemplate = async (templateData) => {
        const res = await updateWorkout(templateData.id, templateData);
        const updatedTemplates = templates.map((template) => {
            if (template.id === res.id) {
                return res;
            } else {
                return template;
            }
        });
        setTemplates(updatedTemplates);
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
    };




}