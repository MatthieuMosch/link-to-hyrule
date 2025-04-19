import "./Tile.css";
import {useNavigate} from "react-router-dom";

function Tile({id, name, img}) {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={() => navigate(`/detail/${id}`)}>
            <figure>
                <img src={img} alt={name}/>
                <figcaption>{name}</figcaption>
            </figure>
        </button>
    );
}

export default Tile;
