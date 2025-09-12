import { useState, useEffect } from "react";

export default function WorkoutForm({ workout, onSubmit, onClose }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState(null);

    let buttonText;
    if (workout) {
        buttonText = "Update Workout";
    } else {
        buttonText = "Add Workout";
    }
    
    useEffect(
        () => {
            if (workout) {
                setName(name);
                setDate(date);
            }
        }, [workout]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        let workoutData = {
            name,
            date
        }

        onSubmit(workoutData);
        setName("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                placeholder="Workout Name" 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input
                type="date"
                value={date}
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">{buttonText}</button>
            {exercise ? (
                <button onClick={onClose}>Cancel</button>
            ) : null}
        </form>
    );
}