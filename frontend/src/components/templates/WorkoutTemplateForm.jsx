import { useState, useEffect } from "react";

export default function WorkoutTemplateForm({ onSubmit, onClose }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let templateData = { name };
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
            <button type="submit">Create Template</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}