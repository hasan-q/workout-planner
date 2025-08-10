package com.hasanq.workoutplanner.dto;

public class WorkoutSetDTO {
    private Long id;
    private int setNumber;
    private int reps;
    private double weight;

    public WorkoutSetDTO() {}

    public WorkoutSetDTO(Long id, int setNumber, int reps, double weight) {
        this.id = id;
        this.setNumber = setNumber;
        this.reps = reps;
        this.weight = weight;
    }

    // getters, setters
}
