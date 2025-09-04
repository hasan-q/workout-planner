package com.hasanq.workoutplanner.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<WorkoutEntryDTO> getWorkoutEntries() {
        return workoutEntries;
    }

    public void setWorkoutEntries(List<WorkoutEntryDTO> workoutEntries) {
        this.workoutEntries = workoutEntries;
    }
}
