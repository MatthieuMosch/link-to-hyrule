import "./Detail.css";
import {useParams} from "react-router-dom";

function Detail() {
    const uri = "https://botw-compendium.herokuapp.com/api/v3/compendium/";
    const {id} = useParams();

    return (
        <h2>Detail {id}</h2>
    );
}

export default Detail;
