import { useState, useEffect } from "react";

export default function ExerciseForm({ exercise, onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    let buttonText;
    if (exercise) {
        buttonText = "Update Exercise";
    } else {
        buttonText = "Add Exercise";
    }

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
        setName("");
        setMuscleGroup("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                placeholder="Exercise Name" 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input
                type="text"
                value={muscleGroup}
                placeholder="Muscle Group"
                onChange={(e) => setMuscleGroup(e.target.value)}
                required
            />
            <button type="submit">{buttonText}</button>
            {exercise ? (
                <button onClick={onClose}>Cancel</button>
            ) : null}
        </form>
    );
}