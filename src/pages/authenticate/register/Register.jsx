import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthProvider.jsx";
import {checkPasswordConfirm, checkPasswordLength} from "../../../helpers/checkPassword.jsx";
import InputField from "../../../components/inputfield/InputField.jsx";
import Button from "../../../components/button/Button.jsx";
import FieldCheck from "../../../components/fieldcheck/FieldCheck.jsx";
import Error from "../../../components/error/Error.jsx";

import "../authenticate.css";

function Register() {
    const {register} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        info: "",
        role: ["user"]
    });
    const [checkLength, setCheckLength] = useState(false);
    const [checkConfirm, setCheckConfirm] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkFields, setCheckFields] = useState(false);

    useEffect(() => {
        setCheckConfirm(checkPasswordConfirm(formState.password, formState.confirm))
    }, [formState.password, formState.confirm]);

    useEffect(() => {
        setCheckLength(checkPasswordLength(formState.password, 6));
    }, [formState.password]);

    useEffect(() => {
        setCheckEmail(formState.email.includes("@"));
    }, [formState.email]);

    function handleChange(e) {
        setFormState((prev) =>({...prev, [e.target.name]: e.target.value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");
        if (formState.username && formState.email && formState.password && formState.confirm) {
            setCheckFields(true);
        } else {
            setCheckFields(false);
            setErrorMsg("Please fill in all fields");
        }
        if (checkFields && checkEmail && checkLength && checkConfirm) {
            void register(formState);
        }
    }

    return (
        <main className="authenticate">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <InputField type="text" name="username" placeholder="Enter username"
                            value={formState.username} changeHandler={handleChange}>
                    Username:
                </InputField>
                <InputField type="text" name="email" placeholder="name@domain"
                            value={formState.email} changeHandler={handleChange}>
                    E-mail:
                </InputField>
                <InputField type="password" name="password" placeholder="******"
                            value={formState.password} changeHandler={handleChange}>
                    Password:
                </InputField>
                <InputField type="password" name="confirm" placeholder="******"
                            value={formState.confirm} changeHandler={handleChange}>
                    Confirm:
                </InputField>
                <FieldCheck check={checkEmail}>E-mail contains an "@"</FieldCheck>
                <FieldCheck check={checkLength}>Password is at least 6 characters long</FieldCheck>
                <FieldCheck check={checkConfirm}>Passwords match</FieldCheck>
                <Button type="submit"
                        disabled={!checkEmail || !checkLength || !checkConfirm}>
                    Register
                </Button>
                {errorMsg &&
                    <Error>{errorMsg}</Error>
                }
            </form>
        </main>
    );
}

export default Register;
