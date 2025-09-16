export default function WorkoutEntry({ entry, exercises, onUpdate, onDelete, onCreateSet, onUpdateSet, onDeleteSet }) {
    const defaultReps = 8;
    const defaultWeight = 45;

    return (
        <div className="workout-entry">
            <label>
                Exercise:
                <select value={entry.exercise.id} onChange={(e) => onUpdate(entry.id, entry.exercise.id, entry.notes)}>
                    {exercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                    ))}
                </select>
            </label>
            <label>Notes: 
                <input
                    type="text"
                    value={entry.notes || ""}
                    onChange={(e) => onUpdate(entry.id, entry.exercise.id, e.target.value)}
                />
            </label>
            <button onClick={() => onDelete(entry.id)}>Delete Planned Exercise</button>

            <h3>Sets</h3>
            {entry.sets.map(set => (
                <div key={set.id}>
                    <input
                        type="number"
                        value={set.setNumber}
                        onChange={(e) => onUpdateSet(entry.id, set.id, e.target.value, set.reps, set.weight)}
                    />
                    <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => onUpdateSet(entry.id, set.id, set.setNumber, e.target.value, set.weight)}
                    />
                    <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => onUpdateSet(entry.id, set.id, set.setNumber, set.reps, e.target.value)}
                    />
                    <button onClick={() => onDeleteSet(entry.id, set.id)}>Delete Set</button>
                </div>
            ))}

            <button onClick={() => onCreateSet(entry.id, entry.sets.length + 1, defaultReps, defaultWeight)}>+ Add Set</button>
        </div>
    );
}
