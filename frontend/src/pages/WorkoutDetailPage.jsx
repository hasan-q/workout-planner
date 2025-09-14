import { useState, useEffect } from "react";
import { 
    getWorkoutById,
    updateWorkout,
    createWorkoutEntry,
    updateWorkoutEntry,
    deleteWorkoutEntry,
    createExerciseSet,
    updateExerciseSet,
    deleteExerciseSet    
} from "../api/workoutService";