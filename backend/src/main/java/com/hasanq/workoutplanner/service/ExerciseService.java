package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Exercise;
import com.hasanq.workoutplanner.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getAllExercisesByUser(AppUser user) {
        return exerciseRepository.findByUser(user);
    }

    public Exercise getExerciseById(Long id, AppUser user) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise id=" + id + " not found."));
        if (!exercise.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return exercise;
    }

    public Exercise createExercise(Exercise exercise, AppUser user) {
        exercise.setUser(user);
        return exerciseRepository.save(exercise);
    }

    public Exercise updateExercise(Exercise exerciseToUpdate) {
        return exerciseRepository.save(exerciseToUpdate);
    }

    public void deleteExercise(Long id, AppUser user) {
        Exercise exercise = getExerciseById(id, user);
        exerciseRepository.delete(exercise);
    }
}
