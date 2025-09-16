import { useState, useEffect } from "react";

export default function WorkoutTemplateForm({ initialWorkout, onSubmit, onClose }) {
    const [name, setName] = useState("");

    let buttonText;
    if (initialWorkout) {
        buttonText = "Update Template";
    } else {
        buttonText = "Create Template";
    }

    useEffect(
        () => {
            if (initialWorkout) {
                setName(initialWorkout.name);
            }
        }, [initialWorkout]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        let templateData = { 
            name,
            date: null
        };
        onSubmit(templateData);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                placeholder="Workout Template Name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">{buttonText}</button>
            {initialWorkout ? (
                <button type="button" onClick={onClose}>Cancel</button>
            ) : null}
        </form>
    );
}