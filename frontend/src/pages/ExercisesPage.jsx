import { useState, useEffect } from "react";
import { getExercises, createExercise, updateExercise, deleteExercise } from "../api/exerciseService";
import ExerciseForm from "../components/ExercisesForm";
import ExercisesList from "../components/ExercisesList";

export default function ExercisesPage() {
    const [exercises, setExercises] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedExercise, setSelectedExercises] = useState(null);

    useEffect(
        () => {
            (async () => {
                try {
                    const res = await getExercises();
                    setExercises(res.data);
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading(false);
                }
            })();
        }, []
    );

    const handleAddExercise = async (exerciseData) => {
        const res = await createExercise(exerciseData);
        setExercises([...exercises, res.data]);
    };

    const handleUpdateExercise = async (exerciseData) => {
        const res = await updateExercise(exerciseData.id, exerciseData);
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === res.data.id) {
                return res.data;
            } else {
                return exercise;
            }
        });
        setExercises(updateExercise);
    };

    const handleDeleteExercise = async (id) => {
        await deleteExercise(id);
    };

    return (
        <div className="Exercises">
            
        </div>
    );
}
