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

    const handleUpdateWorkout = async () => {
        const data = {
            name: workout.name,
            date: workout.date
        };
        const updatedWorkout = await updateWorkout(workoutId, data);
        setWorkout(updatedWorkout);
    };


}