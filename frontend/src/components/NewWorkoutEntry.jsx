import { useState } from "react";

export default function NewWorkoutEntry({ exercises, onCreate }) {
    const [exerciseId, setExerciseId] = useState("");
    const defaultNotes = "";

    const handleSubmit = () => {
        if (!exerciseId) {
            alert("Please select an exercise.");
            return;
        } 
        onCreate(exerciseId, defaultNotes);
        setExerciseId("");
    }

    // Add a default empty first option in the exercises dropdown
    return (
        <div className="new-workout-entry">
            <label>Exercise:
                <select value={exerciseId} onChange={(e) => setExerciseId(e.target.value)}>
                    {exercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                    ))}
                </select>
            </label>
            <button onClick={handleSubmit}>+ Add</button>
        </div>
    );
}