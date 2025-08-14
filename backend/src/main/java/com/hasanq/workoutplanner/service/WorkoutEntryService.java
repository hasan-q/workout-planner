package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.model.Workout;
import com.hasanq.workoutplanner.model.WorkoutEntry;
import com.hasanq.workoutplanner.repository.WorkoutEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutEntryService {

    private final WorkoutEntryRepository workoutEntryRepository;

    @Autowired
    public WorkoutEntryService(WorkoutEntryRepository workoutEntryRepository) {
        this.workoutEntryRepository = workoutEntryRepository;
    }

    public List<WorkoutEntry> getAllEntriesByWorkout(Workout workout) {
        return workoutEntryRepository.findByWorkout(workout);
    }

    public WorkoutEntry getEntryById(Long id) {
        return workoutEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Entry id=" + id + " not found."));
    }

    public WorkoutEntry createWorkoutEntry(Workout workout, WorkoutEntry workoutEntry) {
        workoutEntry.setWorkout(workout);
        return workoutEntryRepository.save(workoutEntry);
    }

    public WorkoutEntry updateWorkoutEntry(WorkoutEntry workoutEntryToUpdate) {
        return workoutEntryRepository.save(workoutEntryToUpdate);
    }

    public void deleteWorkoutEntry(WorkoutEntry workoutEntry) {
        workoutEntryRepository.delete(workoutEntry);
    }
}
