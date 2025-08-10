package com.hasanq.workoutplanner.dto;

public class ExerciseSetDTO {
    private Long id;
    private int setNumber;
    private int reps;
    private double weight;

    public ExerciseSetDTO() {}

    public ExerciseSetDTO(Long id, int setNumber, int reps, double weight) {
        this.id = id;
        this.setNumber = setNumber;
        this.reps = reps;
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSetNumber() {
        return setNumber;
    }

    public void setSetNumber(int setNumber) {
        this.setNumber = setNumber;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }
}
