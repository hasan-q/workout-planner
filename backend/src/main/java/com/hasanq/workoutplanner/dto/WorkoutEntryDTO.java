package com.hasanq.workoutplanner.dto;

import java.util.List;

public class WorkoutEntryDTO {
    private Long id;
    private ExerciseDTO exercise;
    private String notes;
    private List<WorkoutSetDTO> sets;

    public WorkoutEntryDTO() {}

    public WorkoutEntryDTO(Long id, ExerciseDTO exercise, String notes, List<WorkoutSetDTO> sets) {
        this.id = id;
        this.exercise = exercise;
        this.notes = notes;
        this.sets = sets;
    }

    // getters, setters
}
