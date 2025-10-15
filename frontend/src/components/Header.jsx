import { NavLink } from "react-router-dom";
import './Header.css'

const getClass = ({ isActive }) => isActive ? 'active' : '';

export default function Header() {
    return (
        <header className="header">
            <nav>
                <p className="nav-title">Workout Planner</p>
                <ul className="nav-list-other">
                    <li>
                        <NavLink to="/dashboard" className={getClass}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/exercises" className={getClass}>Exercises</NavLink>
                    </li>
                    <li>
                        <NavLink to="/workouts" className={getClass}>Workouts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/history" className={getClass}>History</NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" className={getClass}>Account</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
