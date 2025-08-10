package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutEntryRepository extends JpaRepository<WorkoutEntry, Long> {
    List<WorkoutEntry> findByWorkout(Workout workout);
}
