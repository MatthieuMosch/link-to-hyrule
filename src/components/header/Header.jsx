import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider.jsx";

function Header() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <header>
            <h1>Link to Hyrule</h1>
            <button type="button" onClick={() => navigate("/login")}>Login</button>
            <button type="button" onClick={() => navigate("/register")}>Register</button>
            <button type="button" onClick={logout}>Logout</button>
        </header>
    );
}

export default Header;