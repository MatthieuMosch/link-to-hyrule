import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const uri = "https://frontend-educational-backend.herokuapp.com/api/";
    const navigate = useNavigate();
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{uri, ...auth, login}}>
            {loading ? <h1>Processing...</h1> : children}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;