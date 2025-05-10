import "./Overview.css";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Tile from "../../components/tile/Tile.jsx";
import InputField from "../../components/inputfield/InputField.jsx";

function Overview() {
    const controller = new AbortController();
    const uri = "https://botw-compendium.herokuapp.com/api/v3/compendium";
    const regions = "https://botw-compendium.herokuapp.com/api/v3/regions";
    const {category} = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tiles, setTiles] = useState([]);
    const [filteredTiles, setFilteredTiles] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            try {
                if (category === "regions") {
                    const response = await axios.get(
                        `${regions}/all`,
                        {signal: controller.signal}
                    );
                    console.log("regions", response);
                    setTiles(response.data.data);
                } else {
                    const response = await axios.get(
                        `${uri}/category/${category}`,
                        {signal: controller.signal}
                    );
                    setTiles(response.data.data);
                }
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

    useEffect(() => {
        setFilteredTiles(tiles.filter((tile) => tile.name.toLowerCase().includes(query.toLowerCase())));
        // TODO : add more filters here
    }, [query, tiles])

    function handleChange(e) {
        setQuery(e.target.value)
    }

    return (
        <main className="overview">
            <h1 className="category">{category}</h1>
            <nav className="filter">
                <InputField type="text" name="query" value={query} placeholder="enter search name"
                            changeHandler={handleChange}>
                    Search for
                </InputField>
            </nav>
            <article className="table">
                {loading && <h2>Loading tiles...</h2>}
                {errorMsg ? <h2>error {errorMsg}</h2> :
                    filteredTiles.length > 0 ?
                        <section className="tiles">
                            {
                                filteredTiles.map(tile => (
                                    <Tile key={tile.id} id={tile.id} name={tile.name} img={tile.image}/>
                                ))
                            }
                        </section> :
                        <h2>No data found</h2>
                }
            </article>
        </main>
    );
}

export default Overview;
