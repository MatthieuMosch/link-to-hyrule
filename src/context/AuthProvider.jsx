import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {checkJwt} from "../helpers/checkJWT.jsx";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const uri = "https://frontend-educational-backend.herokuapp.com/api/";
    const [errorMsg, setError] = useState("");
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {
            username: "",
            email: "",
            password: "",
            info: "",
            role: ["user"]
        },
        isDone: false,
    });

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && checkJwt(jwt)) {
            setAuth({...auth, isAuth: true, isDone: true});
        } else {
            setAuth({...auth, isAuth: false, isDone: true});
        }
    }, []);

    async function login(user) {
        setError("");
        try {
            const response = await axios.post(uri + "auth/signin",
                {username: user.username, password: user.password});
            if (response.status === 200) {
                setAuth({...auth, isAuth: true});
                localStorage.setItem("jwt", response.data.accessToken);
                navigate("/profile");
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    }

    function logout() {
        setAuth({...auth, isAuth: false, user: {}});
        localStorage.removeItem("jwt");
    }

    return (
        <AuthContext.Provider value={{uri, ...auth, login, logout}}>
            {auth.isDone ? children : <h1>Processing...</h1>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;