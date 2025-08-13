package com.hasanq.workoutplanner.mapper;

import com.hasanq.workoutplanner.dto.WorkoutEntryDTO;
import com.hasanq.workoutplanner.model.WorkoutEntry;

import java.util.stream.Collectors;

public class WorkoutEntryMapper {

    private final ExerciseMapper exerciseMapper = new ExerciseMapper();
    private final ExerciseSetMapper exerciseSetMapper = new ExerciseSetMapper();

    public WorkoutEntryDTO toDto(WorkoutEntry entry) {
        if (entry == null) return null;

        WorkoutEntryDTO dto = new WorkoutEntryDTO();
        dto.setId(entry.getId());
        dto.setNotes(entry.getNotes());
        dto.setExercise(exerciseMapper.toDto(entry.getExercise()));

        if (entry.getSets() != null) {
            dto.setSets(
                    entry.getSets()
                            .stream().map(exerciseSetMapper::toDto)
                            .collect(Collectors.toList())
            );
        }
        return dto;
    }

    public WorkoutEntry toEntity(WorkoutEntryDTO dto) {
        if (dto == null) return null;

        WorkoutEntry entry = new WorkoutEntry();
        entry.setId(dto.getId());
        entry.setNotes(dto.getNotes());
        entry.setExercise(exerciseMapper.toEntity(dto.getExercise()));

        // sets handled in service layer

        return entry;
    }
}
