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
                const jwt = response.data.accessToken;
                localStorage.setItem("jwt", jwt);
                void getUser(jwt);
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    }

    async function getUser(jwt) {
        try {
            const response = await axios.get(uri + "user", {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`}});
            console.log("user data", response);
            if (response.status === 200) {
                setAuth({
                    ...auth,
                    isAuth: true,
                    user: {
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email
                    },
                    isDone: true
                });
            }
            navigate("/profile");
        } catch (err) {
            console.error(err);
        } finally {

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
    }

    return (
        <AuthContext.Provider value={{uri, ...auth, login, logout}}>
            {auth.isDone ? children : <h1>Authentication Processing...</h1>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;