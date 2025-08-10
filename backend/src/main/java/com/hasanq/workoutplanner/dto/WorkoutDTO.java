package com.hasanq.workoutplanner.dto;

import java.time.LocalDate;
import java.util.List;

public class WorkoutDTO {
    private Long id;
    private String name;
    private LocalDate date;
    private List<WorkoutEntryDTO> workoutEntries;

    public WorkoutDTO() {}

    public WorkoutDTO(Long id, String name, LocalDate date, List<WorkoutEntryDTO> workoutEntries) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.workoutEntries = workoutEntries;
    }

    // getters, setters
}
