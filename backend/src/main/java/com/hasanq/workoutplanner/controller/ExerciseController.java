package com.hasanq.workoutplanner.controller;

import com.hasanq.workoutplanner.dto.ExerciseDTO;
import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.Exercise;
import com.hasanq.workoutplanner.security.SecurityHelper;
import com.hasanq.workoutplanner.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseDTO> getAllExercises() {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        return exerciseService.getAllExercisesByUser(user)
                .stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ExerciseDTO getExerciseById(@PathVariable Long id) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Exercise exercise = exerciseService.getExerciseById(id, user);
        return mapToDto(exercise);
    }

    @PostMapping
    public ExerciseDTO createExercise(@RequestBody ExerciseDTO dto) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Exercise exercise = new Exercise();
        exercise.setName(dto.getName());
        exercise.setMuscleGroup(dto.getMuscleGroup());

        Exercise savedExercise = exerciseService.createExercise(exercise, user);
        return mapToDto(savedExercise);
    }

    @PutMapping("/{id}")
    public ExerciseDTO updateExercise(@PathVariable Long id, @RequestBody ExerciseDTO dto) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Exercise updatedExercise = new Exercise();
        updatedExercise.setName(dto.getName());
        updatedExercise.setMuscleGroup(dto.getMuscleGroup());

        Exercise savedExercise = exerciseService.updateExercise(id, updatedExercise, user);
        return mapToDto(savedExercise);
    }

    @DeleteMapping("/{id}")
    public void deleteExercise(@PathVariable Long id) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        exerciseService.deleteExercise(id, user);
    }

    private ExerciseDTO mapToDto(Exercise exercise) {
        return new ExerciseDTO(
                exercise.getId(),
                exercise.getName(),
                exercise.getMuscleGroup()
        );
    }
}
