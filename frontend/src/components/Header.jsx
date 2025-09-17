import { NavLink } from "react-router-dom";
import './Header.css'

const getClass = ({ isActive }) => isActive ? 'active' : '';

export default function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
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
                </ul>
            </nav>
        </header>
    );
}
