import "./Marker.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthProvider.jsx";
import {loadState, saveState} from "../../helpers/storeState.jsx";

function Marker({id, img, alt}) {
    const [state, setState] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        setState(loadState(user.username, id));
    }, []);

    useEffect(() => {
        saveState(user.username, id, state)
    }, [state]);

    return (
        <button className={`marker ${state}`} onClick={() => setState(prevState => !prevState)}>
            <img src={img} alt={alt}/>
        </button>
    );
}

export default Marker;
