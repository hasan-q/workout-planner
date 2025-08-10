package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.ExerciseSet;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import com.hasanq.workoutplanner.repository.ExerciseSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseSetService {

    private final ExerciseSetRepository exerciseSetRepository;

    @Autowired
    public ExerciseSetService(ExerciseSetRepository exerciseSetRepository) {
        this.exerciseSetRepository = exerciseSetRepository;
    }

    public List<ExerciseSet> getAllExerciseSets(WorkoutEntry workoutEntry) {
        return exerciseSetRepository.findByWorkoutEntry(workoutEntry);
    }

    public Optional<ExerciseSet> getExerciseSetById(Long id) {
        return exerciseSetRepository.findById(id);
    }

    public ExerciseSet saveExerciseSet(ExerciseSet exerciseSet) {
        return exerciseSetRepository.save(exerciseSet);
    }

    public ExerciseSet updateExerciseSetById(Long id, ExerciseSet exerciseSet) {

    }
}
