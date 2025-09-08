import { useState, useEffect } from "react";
import { getExercises, createExercise, updateExercise, deleteExercise } from "../api/exerciseService";
import ExerciseForm from "../components/ExercisesForm";
import ExercisesList from "../components/ExercisesList";

export default function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);


    // Bugfix: res.data does not work: exerciseService.js returns response.data already
    // Calling res.data would essentially mean res.data.data, so call res only
    
    useEffect(
        () => {
            (async () => {
                try {
                    const res = await getExercises();
                    console.log("Get exercises res:", res);
                    console.log("Exercises from exercises, setExercises:", exercises);
                    setExercises(res);
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
        setExercises([...exercises, res]);
    };

    const handleUpdateExercise = async (exerciseData) => {
        const res = await updateExercise(exerciseData.id, exerciseData);
        const updatedExercises = exercises.map((exercise) => {
            if (exercise.id === res.id) {
                return res;
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
