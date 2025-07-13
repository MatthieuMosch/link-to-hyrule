import "./Header.css";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import logo from "../../assets/zeldaicon.png";

function Header() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <header>
            <Link className="title" to="/">
                <figure className="logo"><img src={logo} alt="logo"/></figure>
                Link to Hyrule
            </Link>
            <nav className="authentication">
                {isAuth ?
                    <ul>
                        <li><Button className="nav-button" onClick={() => navigate("/")}>Home</Button></li>
                        <li><Button className="nav-button" onClick={() => navigate("/quiz/monsters")}>Quiz</Button></li>
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
