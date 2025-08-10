package com.hasanq.workoutplanner.dto;

import java.time.LocalDate;
import java.util.List;

public class WorkoutDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private List<WorkoutExerciseDTO> workoutExercises;

    public WorkoutDTO() {}

    public WorkoutDTO(Long id, String name, LocalDate date, List<WorkoutExerciseDTO> workoutExercises) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.workoutExercises = workoutExercises;
    }

    // getters, setters
}
