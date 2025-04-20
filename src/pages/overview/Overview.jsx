import "./Overview.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Tile from "../../components/tile/Tile.jsx";

function Overview() {
    const controller = new AbortController();
    const uri = "https://botw-compendium.herokuapp.com/api/v3/compendium/";
    const {category} = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tiles, setTiles] = useState([]);

    // regions
    // const regions = "https://botw-compendium.herokuapp.com/api/v3/regions/";
    // const response = await axios.get(regions + "all");

    useEffect(() => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            try {
                const response = await axios.get(
                    `${uri}category/${category}`,
                    {signal: controller.signal}
                );
                setTiles(response.data.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.error("Request: ", err.message);
                } else {
                    setErrorMsg(err.message);
                    console.error("Overview error", err);
                }
            } finally {
                setLoading(false);
            }
        }
        void getData();
        return function cleanup() {
            controller.abort();
        }
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
