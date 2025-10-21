import api from "./api";

export async function getExercises() {
    const response = await api.get("/exercises");
    return response.data;
}

export async function getExerciseById(id) {
    const response = await api.get(`/exercises/${id}`)
    return response.data;
}

export async function createExercise({ name, muscleGroup }) {
    const body = {
        name,
        muscleGroup
    }

    const response = await api.post("/exercises", body);
    return response.data;
}

export async function updateExercise(exerciseId, { name, muscleGroup }) {
    const body = {
        name,
        muscleGroup
    }

    const response = await api.put(`/exercises/${exerciseId}`, body);
    return response.data;
}

export async function deleteExercise(exerciseId) {
    const response = await api.delete(`/exercises/${exerciseId}`);
}
