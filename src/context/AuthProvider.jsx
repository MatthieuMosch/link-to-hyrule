import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {checkJwt} from "../helpers/checkJWT.jsx";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

// TODO : check if alive (test to wakeup)
// GET /api/test/all
// answer should be : "De API is bereikbaar."
// https://frontend-educational-backend.herokuapp.com/api/test/all
// more info on : https://github.com/hogeschoolnovi/novi-educational-backend-documentation?tab=readme-ov-file#0-test

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const controller = new AbortController();
    const uri = "https://frontend-educational-backend.herokuapp.com/api/";
    const [errorMsg, setErrorMsg] = useState("");
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {
            id: null,
            username: "",
            email: "",
            password: "",
            info: "Extra info",
            roles: ["user"]
        },
        isDone: false,
    });

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && checkJwt(jwt)) {
            void getUser();
        } else {
            void logout();
        }
        return function cleanup() {
            controller.abort();
        }
    }, []);

    async function register(user) {
        setErrorMsg("");
        try {
            const response = await axios.post(
                uri + "auth/signup",
                user,
                {signal: controller.signal}
            );
            if (response.status === 200) {
                void login(user);
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.error("Request: ", err.message);
            } else {
                setErrorMsg(err.response.data.message);
                console.error("Registration error", err);
            }
        }
    }

    async function login(user) {
        setErrorMsg("");
        try {
            const response = await axios.post(
                uri + "auth/signin",
                {username: user.username, password: user.password},
                {signal: controller.signal}
            );
            if (response.status === 200) {
                setAuth({...auth, isAuth: true, isDone: true});
                const jwt = response.data.accessToken;
                localStorage.setItem("jwt", jwt);
                void getUser();
                navigate("/");
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.error("Request: ", err.message);
            } else {
                setErrorMsg(err.message);
                console.error("Login error", err);
            }
            setAuth({...auth, isAuth: false, isDone: true});
        }
    }

    async function getUser() {
        const jwt = localStorage.getItem("jwt");
        try {
            const response = await axios.get(
                uri + "user",
                {headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`},
                    signal: controller.signal}
            );
            if (response.status === 200) {
                setAuth({...auth, isAuth: true, user: {
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email
                    },
                    isDone: true
                });
            } else {
                console.error("User data error", response);
                setAuth({...auth, isAuth: false, isDone: true});
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.error("Request: ", err.message);
            } else {
                console.error("User data error", err);
            }
            setAuth({...auth, isAuth: false, isDone: true});
        }
    }

    function logout() {
        setAuth({...auth,
            isAuth: false,
            user: {
                    id: null,
                    username: "",
                    email: "",
                    password: "",
                    info: "Extra Info",
                    roles: ["user"]},
            isDone: true
        });
        localStorage.removeItem("jwt");
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{uri, ...auth, register, login, logout, getUser}}>
            {auth.isDone ? children : <h1>Authentication Processing...</h1>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
