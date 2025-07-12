import "./CloseButton.css";
import {Link} from "react-router-dom";

function CloseButton({to}) {
    return (
        <Link to={to} className="close"/>
    );
}

export default CloseButton;
