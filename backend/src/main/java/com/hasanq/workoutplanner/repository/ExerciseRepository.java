package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByUser(AppUser user);
}
