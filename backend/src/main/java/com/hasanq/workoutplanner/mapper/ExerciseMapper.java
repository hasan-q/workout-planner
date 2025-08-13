package com.hasanq.workoutplanner.mapper;

import com.hasanq.workoutplanner.dto.ExerciseDTO;
import com.hasanq.workoutplanner.model.Exercise;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExerciseMapper {

    private static final Logger log = LoggerFactory.getLogger(ExerciseMapper.class);

    public ExerciseDTO toDto(Exercise exercise) {
        if (exercise == null) return null;

        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setMuscleGroup(dto.getMuscleGroup());

        return dto;
    }

    public Exercise toEntity(ExerciseDTO dto) {
        if (dto == null) return null;

        Exercise exercise = new Exercise();
        exercise.setId(dto.getId());
        exercise.setName(dto.getName());
        exercise.setMuscleGroup(dto.getMuscleGroup());

        return exercise;
    }
}
