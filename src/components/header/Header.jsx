import {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider.jsx";

import "./Header.css";

function Header() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <header>
            <button type="button" onClick={() => navigate("/")}>Home</button>
            <p>logged in : {isAuth.toString()}</p>
            <button type="button" onClick={logout}>Logout</button>
            <h1>Link to Hyrule</h1>
            <nav>
                <ul>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/">
                        Home
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/register">
                        Register
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/login">
                        Login
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/profile">
                        Profile
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/">
                        Logout
                    </NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
