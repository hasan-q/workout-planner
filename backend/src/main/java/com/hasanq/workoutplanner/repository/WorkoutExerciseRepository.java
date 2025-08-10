package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.WorkoutEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutEntry, Long> {
}
