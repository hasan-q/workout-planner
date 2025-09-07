import { useState, useEffect } from "react";

export default function ExerciseForm({ exercise, onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    useEffect(
        () => {
            if (exercise) {
                setName(exercise.name);
                setMuscleGroup(exercise.muscleGroup);
            }
        }, [exercise]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        let exerciseData = { name, muscleGroup }

        if (exercise) {
            exerciseData.id = exercise.id;
        }

        // passed through
        onSubmit(exerciseData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="Exercise Name" onChange={(e) => setName(e.target.value)} required />
        </form>
    );
}