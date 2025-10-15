import { useNavigate } from "react-router-dom";
import { createWorkout, createWorkoutEntry, createExerciseSet } from "../api/workoutService";

export function useStartWorkout() {
    const navigate = useNavigate();

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

    return { handleStartWorkout };
}