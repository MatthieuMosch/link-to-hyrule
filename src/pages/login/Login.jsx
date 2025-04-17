import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import InputField from "../../components/inputfield/InputField.jsx";

function Login() {
    const {login} = useContext(AuthContext);
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        info: "",
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
        <>
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
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;