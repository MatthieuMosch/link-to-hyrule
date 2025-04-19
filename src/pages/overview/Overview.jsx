import "./Overview.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Tile from "../../components/tile/Tile.jsx";

function Overview() {
    const uri = "https://botw-compendium.herokuapp.com/api/v3/compendium/";
    const {category} = useParams();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [tiles, setTiles] = useState([]);

    // regions
    // const regions = "https://botw-compendium.herokuapp.com/api/v3/regions/";

    useEffect(() => {
        async function getData() {
            try {
                // const response = await axios.get(regions + "all");
                const response = await axios.get(`${uri}category/${category}`);
                setTiles(response.data.data);
            } catch (err) {
                setErrorMsg(err.message);
                console.error("getData error", err);
            } finally {
                setLoading(false);
            }
        }

        void getData();
    }, []);

    return (
        <>
            <h2>Overview {category}</h2>
            {loading && <h2>Loading tiles...</h2>}
            {errorMsg ? <h2>error {errorMsg}</h2> :
                tiles.length > 0 ?
                    <ul>
                        {
                            tiles.map(tile => (
                                <li key={tile.id}>
                                    <Tile id={tile.id} name={tile.name} img={tile.image} />
                                </li>
                            ))
                        }
                    </ul> :
                    <h2>No data found</h2>
            }
        </>
    );
}

export default Overview;
