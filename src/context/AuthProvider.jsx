import {createContext, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const uri = "https://frontend-educational-backend.herokuapp.com/api/";
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
    const [errorMsg, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function login(user) {
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(uri + "auth/signin", user);
            console.log("login response", response);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{uri, ...auth, login}}>
            {children}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;