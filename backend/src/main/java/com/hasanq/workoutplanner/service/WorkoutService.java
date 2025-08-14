package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<Workout> getAllWorkoutsByUser(AppUser user) {
        return workoutRepository.findByUser(user);
    }

    public Workout getWorkoutById(Long id, AppUser user) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout id=" + id + " not found."));

        if (!workout.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return workout;
    }

    public Workout createWorkout(Workout workout, AppUser user) {
        workout.setUser(user);
        return workoutRepository.save(workout);
    }

    public Workout updateWorkout(Workout workoutToUpdate) {
        return workoutRepository.save(workoutToUpdate);
    }

    public void deleteWorkoutById(Long id, AppUser user) {
        Workout workout = getWorkoutById(id, user);
        workoutRepository.delete(workout);
    }
}
