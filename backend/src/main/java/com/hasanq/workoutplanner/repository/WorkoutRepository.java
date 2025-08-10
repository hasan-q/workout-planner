package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser(AppUser user);
}
