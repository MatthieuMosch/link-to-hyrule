import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import axios from "axios";


function Register() {
    const {uri, login} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        info: "",
        role: ["user"]
    })

    async function register() {
        setFormState({
            ...formState,
            username: "matthieu",
            email: "m@m",
            password: "mmmmmm",
            info: "extra info",
            role: ["user"]
        });
        setErrorMsg("");
        setLoading(true);
        try {
            const response = await axios.post(uri + "auth/signup", formState);
            console.log("signup response", response);
            if (response.status === 200) {
                console.log("registration successful");
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <>
            <h1>registeren</h1>
            <form onSubmit={handleSubmit}>

            </form>

            <button type="button" onClick={register}></button>
            {loading && <h2>Loading ....</h2>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </>
    );
}

export default Register;