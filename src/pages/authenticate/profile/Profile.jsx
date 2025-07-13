import "../authenticate.css";

import {useContext, useEffect} from "react";
import {AuthContext} from "../../../context/AuthProvider.jsx";
import InputField from "../../../components/inputfield/InputField.jsx";

function Profile() {
    const {user, getUser} = useContext(AuthContext);

    useEffect(() => {
        void getUser();
    }, [])

    return (
        <main className="authenticate">
            <h1>Profile</h1>
            <form>
                <InputField type="text" name="username"
                            value={user.username} readonly>
                    Username:
                </InputField>
                <InputField type="text" name="email"
                            value={user.email} readOnly>
                    E-mail:
                </InputField>
            </form>
        </main>
    );
}

export default Profile;
