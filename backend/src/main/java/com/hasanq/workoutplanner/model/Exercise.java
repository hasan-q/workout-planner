package com.hasanq.workoutplanner.model;

import jakarta.persistence.*;

public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String muscleGroup;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}
