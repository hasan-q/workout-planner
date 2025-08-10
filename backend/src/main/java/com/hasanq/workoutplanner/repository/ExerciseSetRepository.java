package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.ExerciseSet;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Long> {
    List<ExerciseSet> findByWorkoutEntry(WorkoutEntry workoutEntry);
}
