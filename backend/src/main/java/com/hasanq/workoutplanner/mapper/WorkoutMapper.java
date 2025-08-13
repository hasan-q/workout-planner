package com.hasanq.workoutplanner.mapper;

import com.hasanq.workoutplanner.dto.WorkoutDTO;
import com.hasanq.workoutplanner.model.Workout;

import java.util.stream.Collectors;

public class WorkoutMapper {

    private final WorkoutEntryMapper workoutEntryMapper = new WorkoutEntryMapper();

    public WorkoutDTO toDto(Workout workout) {
        if (workout == null) return null;

        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setDate(workout.getDate());
        dto.setName(workout.getName());

        if (workout.getWorkoutEntries() != null) {
            dto.setWorkoutEntries(
                    workout.getWorkoutEntries()
                            .stream().map(workoutEntryMapper::toDto)
                            .collect(Collectors.toList())
            );
        }
        return dto;
    }

    public Workout toEntity(WorkoutDTO dto) {
        if (dto == null) return null;

        Workout workout = new Workout();
        workout.setId(dto.getId());
        workout.setDate(dto.getDate());
        workout.setName(dto.getName());

        // workout entries handled in service layer

        return workout;
    }
}
