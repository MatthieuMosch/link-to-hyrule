import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import axios from "axios";
import InputField from "../../components/inputfield/InputField.jsx";

import "./Register.css";

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
        setErrorMsg("");
        setLoading(true);
        try {
            const response = await axios.post(uri + "auth/signup", formState);
            console.log("signup response", response);
            if (response.status === 200) {
                console.log("registration successful");
                void login(formState);
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        void register();
    }

    return (
        <>
            <h1>registeren</h1>
            <form onSubmit={handleSubmit}>
                <InputField type="text" name="username" placeholder="Enter username"
                            value={formState.username} changeHandler={handleChange}>
                    Username:
                </InputField>
                <InputField type="email" name="email" placeholder="name@domain"
                            value={formState.email} changeHandler={handleChange}>
                    E-mail:
                </InputField>
                <InputField type="password" name="password" placeholder="******"
                            value={formState.password} changeHandler={handleChange}>
                    Password:
                </InputField>
                <button type="submit">Register</button>
            </form>
            {loading && <h2>Processing....</h2>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </>
    );
}

export default Register;