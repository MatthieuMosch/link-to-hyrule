import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthProvider.jsx";
import InputField from "../../../components/inputfield/InputField.jsx";
import Button from "../../../components/button/Button.jsx";

import "../authenticate.css";

function Login() {
    const {login} = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        info: "Extra info",
        role: ["user"]
    })

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        void login(formState);
    }

    return (
        <main className="authenticate">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <InputField type="text" name="username" placeholder="Enter username"
                            value={formState.username} changeHandler={handleChange}>
                    Username:
                </InputField>
                <InputField type="password" name="password" placeholder="******"
                            value={formState.password} changeHandler={handleChange}>
                    Password:
                </InputField>
                <Button type="submit">Login</Button>
            </form>
        </main>
    );
}

export default Login;
