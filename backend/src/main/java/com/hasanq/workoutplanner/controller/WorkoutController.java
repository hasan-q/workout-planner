package com.hasanq.workoutplanner.controller;

import com.hasanq.workoutplanner.dto.ExerciseDTO;
import com.hasanq.workoutplanner.dto.ExerciseSetDTO;
import com.hasanq.workoutplanner.dto.WorkoutDTO;
import com.hasanq.workoutplanner.dto.WorkoutEntryDTO;
import com.hasanq.workoutplanner.model.ExerciseSet;
import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import com.hasanq.workoutplanner.service.ExerciseSetService;
import com.hasanq.workoutplanner.service.WorkoutEntryService;
import com.hasanq.workoutplanner.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
