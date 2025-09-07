import { useState, useEffect } from "react";
import { getExercises } from "../api/exerciseService";
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
}
