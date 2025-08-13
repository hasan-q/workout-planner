package com.hasanq.workoutplanner.controller;

import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.service.ExerciseSetService;
import com.hasanq.workoutplanner.service.WorkoutEntryService;
import com.hasanq.workoutplanner.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final WorkoutEntryService workoutEntryService;
    private final ExerciseSetService exerciseSetService;

    @Autowired
    public WorkoutController(
            WorkoutService workoutService,
            WorkoutEntryService workoutEntryService,
            ExerciseSetService exerciseSetService
    ) {
        this.workoutService = workoutService;
        this.workoutEntryService = workoutEntryService;
        this.exerciseSetService = exerciseSetService;
    }
}
