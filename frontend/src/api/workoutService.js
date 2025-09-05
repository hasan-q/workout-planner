import api from "./api";

// Workouts

export async function getWorkouts() {
    const response = await api.get("/workouts");
    return response.data;
}

export async function createWorkout({ name, date }) {
    const response = await api.post("/workouts", { name, date });
    return response.data;
}

export async function updateWorkout(id, { name, date }) {
    const response = await api.put(`/workouts/${id}`, { name, date });
    return response.data;
}

export async function deleteWorkout(id) {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
}

// Workout Entries

