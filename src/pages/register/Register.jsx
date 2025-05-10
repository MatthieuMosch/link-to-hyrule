import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import InputField from "../../components/inputfield/InputField.jsx";

import "./Register.css";

function Register() {
    const {register} = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        info: "Extra info",
        role: ["user"]
    })

    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        void register(formState);
    }

    return (
        <main>
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
        </main>
    );
}

export default Register;
