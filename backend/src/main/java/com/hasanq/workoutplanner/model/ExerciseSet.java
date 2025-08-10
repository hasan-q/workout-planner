package com.hasanq.workoutplanner.model;

import jakarta.persistence.*;

public class ExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int setNumber;
    private int reps;
    private double weight;

    @ManyToOne
    @JoinColumn(name = "workout_entry_id", nullable = false)
    private WorkoutEntry workoutEntry;
}
