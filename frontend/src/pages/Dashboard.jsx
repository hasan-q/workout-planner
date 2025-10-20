import "../components/pages.css";
import "../components/dashboard.css";
import { useUserTemplates } from "../hooks/useUserTemplates";
import { useUserWorkouts } from "../hooks/useUserWorkouts";
import { useStartWorkout } from "../utils/workoutUtils";
import { UseViewHistory } from "../utils/historyUtils";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
    
    const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;
    const username = localStorage.getItem("username");
    const { templates, loadingTemplates } = useUserTemplates(5);
    const { workouts: recentWorkouts, loading: loadingRecent } = useUserWorkouts(5);
    const { workouts: allWorkouts, loading: loadingAllWorkouts } = useUserWorkouts();

    const { handleStartWorkout } = useStartWorkout();
    const { handleViewExpandedWorkout } = UseViewHistory();

    const sortedWorkouts = () => {
        if (!allWorkouts || allWorkouts.length === 0) return 0;

        const sorted = [...allWorkouts].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sorted;
    };

    // Used for stats

    const totalWorkouts = allWorkouts.length;
    const getMax = () => {
        let maxWeight = 0;
        let maxExerciseName = "";
        for (const workout of allWorkouts) {
            for (const entry of workout.workoutEntries || []) {
                for (const set of entry.sets || []) {
                    if (set.weight > maxWeight) {
                        maxWeight = set.weight;
                        maxExerciseName = entry.exercise.name;
                    }
                }
            }
        }
        return { maxWeight, maxExerciseName };
    };
    const { maxWeight, maxExerciseName } = getMax();

    const longestStreak = () => {
        if (!allWorkouts || allWorkouts.length === 0) return 0;

        const sorted = sortedWorkouts();

        let maxStreak = 1;
        let currStreak = 1;

        for (let i = 1; i < sorted.length; i++) {
            const prevDate = new Date(sorted[i - 1].date);
            const currDate = new Date(sorted[i].date);

            const diff = currDate - prevDate;

            if (diff <= ONE_DAY_MILLIS && diff >= 0) {
                currStreak++;
            } else {
                currStreak = 1;
            }

            maxStreak = Math.max(maxStreak, currStreak);
        }

        return maxStreak;
    };
    const maxStreak = longestStreak();

    const lastWorkout = () => {
        const currentTimeMillis = Date.now();
        
        const sorted = sortedWorkouts();

        const lastSortedWorkout = sorted[sorted.length - 1];
        const lastWorkoutDate = new Date(lastSortedWorkout?.date);
        const lastWorkoutEpoch = lastWorkoutDate.getTime();

        const daysMillis = currentTimeMillis - lastWorkoutEpoch;
        const days = Math.round(daysMillis / ONE_DAY_MILLIS);
        return days;
    }
    const timeSinceLastWorkout = lastWorkout();

    const cleanISODate = (date) => {
        const [y, m, d] = date.split('-');
        return `${m}/${d}/${y}`;
    };

    // build progress chart
    const randomExercise = () => {
        const exerciseIdArr = [];

        allWorkouts.forEach(workout => {
            workout.workoutEntries.forEach(entry => {
                exerciseIdArr.push(entry.exercise.id);
            });
        });

        const randIndex = Math.floor(Math.random() * exerciseIdArr.length);
        return exerciseIdArr[randIndex];
    };

    if (loadingTemplates) return <p>Loading Workouts...</p>
    if (loadingRecent) return <p>Loading History...</p>
    if (loadingAllWorkouts) return <p>Loading Stats...</p>

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <div className="dashboard-template-container">
                <h2 className="title-text">Your Planned Workouts</h2>
                {templates.length === 0 ? (
                    <p>You have no templates yet.</p>
                ) : (
                    <ul className="dashboard-templates">
                        {templates.map(template => (
                            <li
                                key={template.id}
                                className="dashboard-template-item"
                            >
                                <div>
                                    <h3>{template.name}</h3>
                                    <p className="template-length">{template.workoutEntries.length} Exercises</p>
                                </div>
                                <button 
                                    className="template-item-start"
                                    onClick={() => handleStartWorkout(template)}
                                >
                                    Start Workout
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>View all <Link to="/workouts"className="link">Workouts</Link></p>
            </div>
            <div className="stats-container">   
                <h2 className="title-text">Stats</h2>
                <div className="stats-items">
                    <div className="stat-item">
                        <p className="stat-title">Longest streak</p>
                        <p className="no-margin-p">{maxStreak}</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-title">Days since last workout</p>
                        {timeSinceLastWorkout === 1 ? (
                            <p className="no-margin-p">{timeSinceLastWorkout} day</p>
                        ) : (
                            <p className="no-margin-p">{timeSinceLastWorkout} days</p>
                        )}
                    </div>
                    <div className="stat-item">
                        <p className="stat-title">Strongest lift</p>
                        <p className="no-margin-p">{maxWeight} on {maxExerciseName}</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-title">Total workouts</p>
                        <p className="no-margin-p">{totalWorkouts}</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="title-text">Recent Workouts</h2>
                {recentWorkouts.length === 0 ? (
                    <p>You haven't started any workouts yet.</p>
                ) : (
                    <ul className="dashboard-workouts">
                        {recentWorkouts.map(workout => (
                            <li
                                key={workout.id}
                                className="dashboard-workout-item"
                            >
                                <div>
                                    <h3>{workout.name}</h3>
                                    <p className="workout-date">{cleanISODate(workout.date)}</p>
                                </div>
                                <button 
                                    className="workout-item-view"
                                    onClick={() => handleViewExpandedWorkout(workout.id)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>View workout <Link to="/history"className="link">History</Link></p>
            </div>
        </div>
    );
}