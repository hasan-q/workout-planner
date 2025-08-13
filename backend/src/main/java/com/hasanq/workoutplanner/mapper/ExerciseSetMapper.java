package com.hasanq.workoutplanner.mapper;

import com.hasanq.workoutplanner.dto.ExerciseSetDTO;
import com.hasanq.workoutplanner.model.ExerciseSet;

public class ExerciseSetMapper {

    public ExerciseSetDTO toDto(ExerciseSet set) {
        if (set == null) return null;

        ExerciseSetDTO dto = new ExerciseSetDTO();
        dto.setId(set.getId());
        dto.setReps(set.getReps());
        dto.setSetNumber(set.getSetNumber());
        dto.setWeight(set.getWeight());

        return dto;
    }

    public ExerciseSet toEntity(ExerciseSetDTO dto) {
        if (dto == null) return null;

        ExerciseSet set = new ExerciseSet();
        set.setId(dto.getId());
        set.setReps(dto.getReps());
        set.setSetNumber(dto.getSetNumber());
        set.setWeight(dto.getWeight());

        return set;
    }
}
