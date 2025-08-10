package com.hasanq.workoutplanner.dto;

import java.util.List;

public class WorkoutExerciseDTO {
    private Long id;
    private ExerciseDTO exercise;
    private String notes;
    private List<WorkoutSetDTO> sets;

    public WorkoutExerciseDTO() {}

    public WorkoutExerciseDTO(Long id, ExerciseDTO exercise, String notes, List<WorkoutSetDTO> sets) {
        this.id = id;
        this.exercise = exercise;
        this.notes = notes;
        this.sets = sets;
    }

    // getters, setters
}
