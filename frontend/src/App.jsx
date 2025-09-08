import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ExercisesPage from "./pages/ExercisesPage";
import Dashboard from "./pages/Dashboard";

// Unprotected Routes: Login, Register
// Protected Routes: Dashboard, Exercises, Workouts

export default function App() {
    return (
        <Routes>

            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exercises" element={<ExercisesPage />} />
            </Route>
        </Routes>
    );
}
