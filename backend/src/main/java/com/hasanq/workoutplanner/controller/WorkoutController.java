package com.hasanq.workoutplanner.controller;

import com.hasanq.workoutplanner.dto.ExerciseDTO;
import com.hasanq.workoutplanner.dto.ExerciseSetDTO;
import com.hasanq.workoutplanner.dto.WorkoutDTO;
import com.hasanq.workoutplanner.dto.WorkoutEntryDTO;
import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.ExerciseSet;
import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import com.hasanq.workoutplanner.security.SecurityHelper;
import com.hasanq.workoutplanner.service.ExerciseSetService;
import com.hasanq.workoutplanner.service.WorkoutEntryService;
import com.hasanq.workoutplanner.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping
    public List<WorkoutDTO> getAllWorkouts() {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        return workoutService.getAllWorkoutsByUser(user)
                .stream().map(this::mapWorkoutToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public WorkoutDTO getWorkoutById(@PathVariable Long id) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Workout workout = workoutService.getWorkoutById(id, user);
        return mapWorkoutToDTO(workout);
    }

    @PostMapping
    public WorkoutDTO createWorkout(@RequestBody WorkoutDTO dto) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Workout workout = new Workout();
        workout.setName(dto.getName());
        workout.setDate(dto.getDate());
        Workout savedWorkout = workoutService.createWorkout(workout, user);
        return mapWorkoutToDTO(savedWorkout);
    }

    @PutMapping("/{id}")
    public WorkoutDTO updateWorkout(@PathVariable Long id, @RequestBody WorkoutDTO dto) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        Workout updatedWorkout = new Workout();
        updatedWorkout.setName(dto.getName());
        updatedWorkout.setDate(dto.getDate());

        Workout workout = workoutService.updateWorkout(id, updatedWorkout, user);
        return mapWorkoutToDTO(workout);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        AppUser user = SecurityHelper.getAuthenticatedUser();
        workoutService.deleteWorkoutById(id, user);
    }

    // Helper methods

    private WorkoutDTO mapWorkoutToDTO(Workout workout) {
        List<WorkoutEntryDTO> entryDTOs = workoutEntryService.getAllEntriesByWorkout(workout)
                .stream().map(this::mapWorkoutEntryToDTO)
                .collect(Collectors.toList());

        return new WorkoutDTO(
                workout.getId(),
                workout.getName(),
                workout.getDate(),
                entryDTOs
        );
    }

    private WorkoutEntryDTO mapWorkoutEntryToDTO(WorkoutEntry entry) {
        ExerciseDTO exerciseDTO = null;
        if (entry.getExercise() != null) {
            exerciseDTO = new ExerciseDTO(
                    entry.getExercise().getId(),
                    entry.getExercise().getName(),
                    entry.getExercise().getMuscleGroup()
            );
        }

        List<ExerciseSetDTO> setDTOs = exerciseSetService.getAllSetsByWorkoutEntry(entry)
                .stream().map(this::mapExerciseSetToDTO)
                .collect(Collectors.toList());

        return new WorkoutEntryDTO(
                entry.getId(),
                exerciseDTO,
                entry.getNotes(),
                setDTOs
        );
    }

    private ExerciseSetDTO mapExerciseSetToDTO(ExerciseSet set) {
        return new ExerciseSetDTO(
                set.getId(),
                set.getSetNumber(),
                set.getReps(),
                set.getWeight()
        );
    }
}
