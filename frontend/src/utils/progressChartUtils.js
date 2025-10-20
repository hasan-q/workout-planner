export function useGenerateChart() {
    const buildExerciseProgress = (workouts, exerciseId) => {
        const progress = [];

        workouts.forEach(workout => {
            if (!workout.date) return;

            workout.workoutEntries.forEach(entry => {
                if (entry.exercise.id === exerciseId) {
                    const maxWeight = Math.max(...entry.sets.map(set => set.weight));
                    progress.push({ date: workout.date, weight: maxWeight });
                }
            });
        });

        progress.sort((a, b) => new Date(a.date) - new Date(b.date));
        return progress;
    };

    return { buildExerciseProgress };
}