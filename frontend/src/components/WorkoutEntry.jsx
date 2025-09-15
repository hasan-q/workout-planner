export default function WorkoutEntry({ entry, exercises, onUpdate, onDelete, onCreateSet, onUpdateSet, onDeleteSet }) {
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
            
        </div>
    );
}