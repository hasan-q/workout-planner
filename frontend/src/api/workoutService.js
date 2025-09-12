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
}

// Workout Entries

export async function createWorkoutEntry(workoutId, { exerciseId, notes }) {
    const body = {
        exercise: {
            id: exerciseId
        },
        notes
    };

    const response = await api.post(`/workouts/${workoutId}/entries`, body);
    return response.data;
}

export async function updateWorkoutEntry(workoutId, entryId, { exerciseId, notes }) {
    const body = {
        exercise: {
            id: exerciseId
        },
        notes
    };

    const response = await api.put(`/workouts/${workoutId}/entries/${entryId}`, body);
    return response.data;
}

export async function deleteWorkoutEntry(workoutId, entryId) {
    const response = await api.delete(`/workouts/${workoutId}/entries/${entryId}`);
    return response.data;
}

// Exercise Sets

export async function createExerciseSet(entryId, { setNumber, reps, weight }) {
    const body = {
        setNumber,
        reps,
        weight
    };

    const response = await api.post(`/workouts/entries/${entryId}/sets`, body);
    return response.data;
}

export async function updateExerciseSet(setId, { setNumber, reps, weight }) {
    const body = {
        setNumber,
        reps,
        weight
    };

    const response = await api.put(`/workouts/sets/${setId}`, body);
    return response.data;
}

export async function deleteExerciseSet(setId) {
    const response = await api.delete(`/workouts/sets/${setId}`);
    return response.data;
}
