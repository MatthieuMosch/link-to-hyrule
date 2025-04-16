import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";

function Profile() {
    const {user} = useContext(AuthContext);
    return (
        <>
            <h1>Profile</h1>
            <p>user: {user.username}</p>
            <p>email: {user.email}</p>
            <p>info: {user.info}</p>
            <p>role: {user.role[0]}</p>
        </>
    );
}

export default Profile;