import { useState } from "react";

export default function HistoryList({ workouts, expandedId = null, onDelete }) {
    const [expandedWorkout, setExpandedWorkout] = useState(expandedId);

    const toggleExpanded = (id) => {
        // only one workout can be toggled at a time, uses ID
        setExpandedWorkout(expandedWorkout === id ? null : id);
    };

    return (
        <div className="history-list">
            {workouts.length === 0 ? (
                <p>No Workouts yet.</p>
            ) : (
                workouts.map(workout => (
                    <div key={workout.id} className="workout-item">
                        <div className="workout-header">
                            <span>{workout.name}</span>
                            <span>{workout.date}</span>
                            <button onClick={() => toggleExpanded(workout.id)}>
                                {expandedWorkout === workout.id ? "Close" : "View"}
                            </button>
                            <button onClick={() => onDelete(workout.id)}>Delete</button>
                        </div>
                        {expandedWorkout === workout.id && (
                            <div className="expanded-workout">
                                {workout.workoutEntries.map(entry => (
                                    <div key={entry.id} className="expanded-entry">
                                        <p>Exercise: {entry.exercise.name}</p>
                                        <p>Notes: {entry.notes}</p>
                                        <div>
                                            <p>Sets:</p>
                                            {entry.sets.map(set => (
                                                <span key={set.id}>{set.setNumber}: {set.weight} for {set.reps} reps</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
