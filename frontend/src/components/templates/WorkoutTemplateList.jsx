export default function WorkoutTemplateList({ templates, onStart, onEdit, onDelete }) {
    return (
        <div>
            {templates.length === 0 ? (
                <p>No templates yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Your Workouts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => (
                            <tr key={template.id}>
                                <td>{template.name}</td>
                                <td>
                                    <button onClick={() => onStart(template)}>Start Workout</button>
                                    <button onClick={() => onEdit(template)}>Edit</button>
                                    <button onClick={() => onDelete(template.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
