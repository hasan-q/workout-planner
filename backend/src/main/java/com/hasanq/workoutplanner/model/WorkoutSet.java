package com.hasanq.workoutplanner.model;

import jakarta.persistence.*;

public class WorkoutSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int setNumber;
    private int reps;
    private double weight;

    @ManyToOne
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;
}
