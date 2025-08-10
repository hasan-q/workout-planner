package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.repository.WorkoutRepository;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Workout> getWorkoutById(Long id, AppUser user) {
        Optional<Workout> workout = workoutRepository.findById(id);

        if (workout.isPresent() && workout.get().getUser().getId().equals(user.getId())) {
            return workout;
        } else {
            return Optional.empty();
        }
    }

    public Workout createWorkout(Workout workout, AppUser user) {
        workout.setUser(user);
        return workoutRepository.save(workout);
    }

    public Workout updateWorkout(Long id, Workout updatedWorkout, AppUser user) {
        Optional<Workout> existingWorkout = workoutRepository.findById(id);

        if (existingWorkout.isPresent()) {
            Workout workout = existingWorkout.get();

            if (!workout.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }

            workout.setName(updatedWorkout.getName());
            workout.setDate(updatedWorkout.getDate());

            return workoutRepository.save(workout);
        } else {
            throw new RuntimeException("Workout id=" + id + " not found.");
        }
    }

    public void deleteWorkoutById(Long id, AppUser user) {
        Optional<Workout> workout = workoutRepository.findById(id);

        if (workout.isPresent()) {
            if (!workout.get().getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized");
            }

            workoutRepository.deleteById(id);
        } else {
            throw new RuntimeException("Workout id=" + id + " not found.");
        }
    }
}
