import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <NavLink to="/" className="link nav__link">Home</NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/room" className="link nav__link">Get Room</NavLink>
                </li>
            </ul>
        </nav>
    );
};