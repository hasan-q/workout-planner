package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.ExerciseSet;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import com.hasanq.workoutplanner.repository.ExerciseSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseSetService {

    private final ExerciseSetRepository exerciseSetRepository;

    @Autowired
    public ExerciseSetService(ExerciseSetRepository exerciseSetRepository) {
        this.exerciseSetRepository = exerciseSetRepository;
    }

    public List<ExerciseSet> getAllSetsByWorkoutEntry(WorkoutEntry workoutEntry) {
        return exerciseSetRepository.findByWorkoutEntry(workoutEntry);
    }

    public ExerciseSet getSetById(Long id) {
        return exerciseSetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise set id=" + id + " not found."));
    }

    public ExerciseSet createSet(ExerciseSet exerciseSet) {
        return exerciseSetRepository.save(exerciseSet);
    }

    public ExerciseSet updateSet(ExerciseSet setToBeUpdated) {
        return exerciseSetRepository.save(setToBeUpdated);
    }

    public void deleteSet(ExerciseSet exerciseSet) {
        exerciseSetRepository.delete(exerciseSet);
    }
}
