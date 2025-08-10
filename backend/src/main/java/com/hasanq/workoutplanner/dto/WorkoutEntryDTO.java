package com.hasanq.workoutplanner.dto;

import java.util.List;

public class WorkoutEntryDTO {
    private Long id;
    private ExerciseDTO exercise;
    private String notes;
    private List<ExerciseSetDTO> sets;

    public WorkoutEntryDTO() {}

    public WorkoutEntryDTO(Long id, ExerciseDTO exercise, String notes, List<ExerciseSetDTO> sets) {
        this.id = id;
        this.exercise = exercise;
        this.notes = notes;
        this.sets = sets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<ExerciseSetDTO> getSets() {
        return sets;
    }

    public void setSets(List<ExerciseSetDTO> sets) {
        this.sets = sets;
    }
}
