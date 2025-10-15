import { Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ExercisesPage from "./pages/ExercisesPage";
import Dashboard from "./pages/Dashboard";
import WorkoutsPage from "./pages/WorkoutsPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
                <Route element={
                    <>
                        <Header />
                        <Outlet />
                    </>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/workouts/:workoutId" element={<WorkoutDetailPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
