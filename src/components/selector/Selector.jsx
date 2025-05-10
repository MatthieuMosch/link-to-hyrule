import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";

import "./Selector.css";

function Selector({img, alt, to}) {
    const navigate = useNavigate();
    return (
        <Button className="selector" onClick={() => navigate(to)}>
            <figure className="selector-image">
                <img src={img} alt={alt}/>
            </figure>
        </Button>
    );
}

export default Selector;
