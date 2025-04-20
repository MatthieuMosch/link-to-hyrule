import {useContext} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider.jsx";
import logo from "../../assets/zeldaicon.png";

import "./Header.css";
import Button from "../button/Button.jsx";

function Header() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <header>
            <Link to="/">
                <figure className="logo"><img src={logo} alt="logo"/></figure>
            </Link>
            <h1>Link to Hyrule</h1>
            <nav>
                {isAuth ?
                    <ul>
                        <li><Button className="nav-button" onClick={() => navigate("/profile")}>Profile</Button></li>
                        <li><Button className="nav-button" onClick={logout}>Logout</Button></li>
                    </ul> :
                    <ul>
                        <li><Button className="nav-button" onClick={() => navigate("/register")}>Register</Button></li>
                        <li><Button className="nav-button" onClick={() => navigate("/login")}>Login</Button></li>
                    </ul>
                }
            </nav>
        </header>
    );
}

export default Header;
