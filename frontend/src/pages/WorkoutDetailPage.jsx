import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
    getWorkoutById,
    updateWorkout,
    createWorkoutEntry,
    updateWorkoutEntry,
    deleteWorkoutEntry,
    createExerciseSet,
    updateExerciseSet,
    deleteExerciseSet
} from "../api/workoutService";
import { getExercises } from "../api/exerciseService";

export default function WorkoutDetailPage() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            (async () => {
                try {
                    const [fetchedWorkout, fetchedExercises] = await Promise.all([
                        getWorkoutById(workoutId),
                        getExercises()
                    ]);
                    setWorkout(fetchedWorkout);
                    setExercises(fetchedExercises);
                } catch(error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [workoutId]
    );
    
    // Workouts

    const handleUpdateWorkout = async () => {
        const data = {
            name: workout.name,
            date: workout.date
        };
        const updatedWorkout = await updateWorkout(workoutId, data);
        setWorkout(updatedWorkout);
    };

    // Workout Entries

    const handleCreateEntry = async (exerciseId, notes) => {
        const newEntry = await createWorkoutEntry(workoutId, { exerciseId, notes });
        setWorkout({
            ...workout,
            workoutEntries: [...workout.workoutEntries, newEntry]
        });
    };

    const handleUpdateEntry = async (entryId, exerciseId, notes) => {
        try {
            const updatedEntry = await updateWorkoutEntry(workoutId, entryId, { exerciseId, notes });

            setWorkout(prevWorkout => ({
                ...prevWorkout,
                workoutEntries: prevWorkout.workoutEntries.map(entry => entry.id === entryId ? updatedEntry : entry)
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEntry = async (entryId) => {
        await deleteWorkoutEntry(workoutId, entryId);
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            workoutEntries: prevWorkout.workoutEntries.filter(entry => entry.id !== entryId)
        }));
    };

    // Exercise Sets

    const handleCreateSet = async (entryId, setNumber, reps, weight) => {
        try {
            const newSet = await createExerciseSet(entryId, {
                setNumber: setNumber,
                reps: reps,
                weight: weight
            });

            setWorkout(prevWorkout => ({
                ...prevWorkout,
                workoutEntries: prevWorkout.workoutEntries.map(entry => 
                  entry.id === entryId ? { ...entry, sets: [...entry.sets, newSet] } : entry)
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateSet = async (entryId, setId, setNumber, reps, weight) => {
        try {
            const updatedSet = await updateExerciseSet(setId, {
                setNumber: setNumber,
                reps: reps,
                weight: weight
            });

            setWorkout(prevWorkout => ({
                ...prevWorkout,
                workoutEntries: prevWorkout.workoutEntries.map(entry => entry.id === entryId ? { 
                    ...entry, 
                    sets: entry.sets.map(set => set.id === setId ? updatedSet : set) 
                } : entry 
                )
            }))
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteSet = async (entryId, setId) => {
        try {
            await deleteExerciseSet(setId);

            setWorkout(prevWorkout => ({
                ...prevWorkout,
                workoutEntries: prevWorkout.workoutEntries.map(entry => entry.id === entryId ? {
                    ...entry,
                    sets: entry.sets.filter(set => set.id !== setId)
                } : entry
                )
            }));
        } catch (error) {
            console.error(error);
        }
    };

    
}
