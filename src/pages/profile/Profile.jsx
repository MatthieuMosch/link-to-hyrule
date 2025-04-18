import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";

function Profile() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <h1>Profile</h1>
            <p>username: {user.username}</p>
            <p>e-mail: {user.email}</p>
            {/*<p>info: {user.info}</p>*/}
        </>
    );
}

export default Profile;