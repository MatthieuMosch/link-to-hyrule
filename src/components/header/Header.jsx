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
            Link to Hyrule
            <nav>
                <ul>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/">
                        Home
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/login">
                        Login
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/register">
                        Register
                    </NavLink></li>
                    <li><NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/">
                        Logout
                    </NavLink></li>
                    <li><button type="button" onClick={logout}>Logout</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
