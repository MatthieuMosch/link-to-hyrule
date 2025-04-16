import {useContext} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";

function Profile() {
    const {user} = useContext(AuthContext);
    return (
        <>
            <h1>Profile</h1>
            {/*<p>user: {user.username}</p>*/}
        </>
    );
}

export default Profile;