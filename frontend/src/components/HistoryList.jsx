import { useState } from "react";

export default function HistoryList({ workouts }) {
    const [expandedWorkout, setExpandedWorkout] = useState(null);

    const toggleExpanded = (id) => {
        // only one workout can be toggled at a time, uses ID
        setExpandedWorkout(expandedWorkout === id ? null : id);
    };
}