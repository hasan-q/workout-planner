package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser(AppUser user);
}
