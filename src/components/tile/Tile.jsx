import "./Tile.css";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";

function Tile({id, name, img}) {
    const navigate = useNavigate();
    return (
        <Button className="tile" onClick={() => navigate(`/detail/${id}`)}>
            <figure className="tile-image">
                <img src={img} alt={name}/>
                <figcaption>{name}</figcaption>
            </figure>
        </Button>
    );
}

export default Tile;
