import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const uri = "https://frontend-educational-backend.herokuapp.com/api/";
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
        isDone: false,
        });
    const [errorMsg, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function login(){
        setError("");
        setLoading(true);
        try {
            const response = await axios
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