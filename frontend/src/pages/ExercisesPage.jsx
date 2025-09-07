import { useState, useEffect } from "react";
import { getExercises, createExercise, updateExercise, deleteExercise } from "../api/exerciseService";
import ExerciseForm from "../components/ExercisesForm";
import ExercisesList from "../components/ExercisesList";

export default function ExercisesPage() {
    const [exercises, setExercises] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);

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
        setExercises(updatedExercises);
    };

    const handleDeleteExercise = async (id) => {
        await deleteExercise(id);
        const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
        setExercises(updatedExercises);
    };

    return (
        <div className="Exercises">
            <ExerciseForm onSubmit={handleAddExercise} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ExercisesList
                    exercises={exercises}
                    onEdit={setSelectedExercise}
                    onDelete={handleDeleteExercise}
                />
            )}
            
            {selectedExercise && (
                <ExerciseForm
                    exercise={selectedExercise}
                    onSubmit={handleUpdateExercise}
                    onClose={() => setSelectedExercise(null)}
                />
            )}
        </div>
    );
}
