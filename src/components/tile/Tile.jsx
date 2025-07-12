import "./Tile.css";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";

function Tile({category, id, name, img}) {
    const navigate = useNavigate();
    if (category === "regions") {
        id = name;
        img = `/regions/${name}.jpg`;
    }
    return (
        <Button className="tile" onClick={() => navigate(`/detail/${category}/${id}`)}>
            <figure className="tile-image">
                <img src={img} alt={name}/>
                <figcaption>{name}</figcaption>
            </figure>
        </Button>
    );
}

export default Tile;
