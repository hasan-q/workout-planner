import { useState, useEffect } from "react";
import { getExercises, createExercise, updateExercise, deleteExercise } from "../api/exerciseService";
import ExerciseForm from "../components/ExercisesForm";
import ExercisesList from "../components/ExercisesList";
import ProgressChart from "../components/ProgressChart";
import { getWorkouts } from "../api/workoutService";

export default function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exerciseToTrack, setExerciseToTrack] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [progressData, setProgressData] = useState([]);
    
    useEffect(
        () => {
            (async () => {
                try {
                    const fetchedExercises = await getExercises();
                    const fetchedWorkouts = await getWorkouts();
                    setExercises(fetchedExercises);
                    setWorkouts(fetchedWorkouts);
                } catch (error) {
                    console.error(error);
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

    const buildExerciseProgress = (workouts, exerciseId) => {
        const progress = [];

        workouts.forEach(workout => {
            if (!workout.date) return;

            workout.workoutEntries.forEach(entry => {
                if (entry.exercise.id === exerciseId) {
                    const maxWeight = Math.max(...entry.sets.map(set => set.weight));
                    progress.push({ date: workout.date, weight: maxWeight });
                }
            });
        });

        progress.sort((a, b) => new Date(a.date) - new Date(b.date));
        return progress;
    }

    const handleSetExerciseToTrack = (exerciseId) => {
        setExerciseToTrack(exerciseId);

        const progress = buildExerciseProgress(workouts, exerciseId);
        setProgressData(progress);
    }

    return (
        <div className="Exercises">
            <ExerciseForm onSubmit={handleAddExercise} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ExercisesList
                        exercises={exercises}
                        onEdit={setSelectedExercise}
                        onDelete={handleDeleteExercise}
                    />

                    <h2>Track Progress</h2>
                    {exerciseToTrack & progressData.length > 0 ? (
                        <div className="tracked-exercise">
                            <ProgressChart
                                data={progressData}
                            />
                        </div>
                    ) : (
                        <p>Select an exercise to see your progress.</p>
                    )}
                </>
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
