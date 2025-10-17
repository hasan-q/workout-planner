import { useNavigate } from "react-router-dom";

export function UseViewHistory() {
    const navigate = useNavigate();

    const handleViewExpandedWorkout = (workoutId) => {
        navigate("/history", {
            state: { expandedId: workoutId }
        });
    };

    return { handleViewExpandedWorkout };
}