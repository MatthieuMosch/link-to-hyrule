import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";

function Profile() {
    const {user, getUser} = useContext(AuthContext);

    useEffect(() => {
        void getUser();
    }, [])

    return (
        <main>
            <h1>Profile</h1>
            <p>username: {user.username}</p>
            <p>e-mail: {user.email}</p>
            {/*<p>info: {user.info}</p>*/}
        </main>
    );
}

export default Profile;
