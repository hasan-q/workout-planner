


//try removing exercises = [] ***************

export default function ExercisesList({ exercises = [], onEdit, onDelete }) {
    return (
        <div>
            {exercises.length === 0 ? (
                <p>No exercises yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Muscle Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise.id}>
                                <td>{exercise.name}</td>
                                <td>{exercise.muscleGroup}</td>
                                <td>
                                    <button onClick={() => onEdit(exercise)}>Edit</button>
                                    <button onClick={() => onDelete(exercise.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}