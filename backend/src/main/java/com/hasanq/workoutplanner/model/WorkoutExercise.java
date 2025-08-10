package com.hasanq.workoutplanner.model;

import jakarta.persistence.*;

import java.util.List;

public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    private String notes;

    @OneToMany(mappedBy = "workoutExercise", cascade = CascadeType.ALL)
    private List<WorkoutSet> sets;
}
