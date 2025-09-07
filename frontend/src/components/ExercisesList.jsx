export default function ExercisesList({ exercises, onEdit, onDelete }) {
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
                    </tbody>
                </table>
            )}
        </div>
    );
}