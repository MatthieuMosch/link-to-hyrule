import "./Overview.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Tile from "../../components/tile/Tile.jsx";
import InputField from "../../components/inputfield/InputField.jsx";
import Button from "../../components/button/Button.jsx";

function Overview() {
    const {category} = useParams();
    const controller = new AbortController();
    const baseUri = "https://botw-compendium.herokuapp.com/api/v3/";
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tiles, setTiles] = useState([]);
    const [filteredTiles, setFilteredTiles] = useState([]);
    const [query, setQuery] = useState("");
    const [sortedTiles, setSortedTiles] = useState([]);
    const [sortDirection, setSortDirection] = useState(0);

    useEffect(() => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            const uri = baseUri + ((category === "regions") ?
                "regions/all" :
                "compendium/category/" + category);
            try {
                const response = await axios.get(uri, {signal: controller.signal});
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

    useEffect(() => {
        setFilteredTiles(tiles.filter((tile) => tile.name.toLowerCase().includes(query.toLowerCase())));
    }, [query, tiles])

    useEffect( () => {
        const sorted = [].concat(filteredTiles);
        sorted.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            let result = 0;
            if (nameA < nameB) {
                result = -1;
            } else if (nameA > nameB) {
                result = 1;
            } else {
                result = 0;
            }
            return result * sortDirection;
        });
        setSortedTiles(sorted);
    }, [sortDirection, filteredTiles]);

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
                {/*<section>*/}
                    <Button className="sort-direction" onClick={() => setSortDirection(1)}>A - Z</Button>
                    <Button className="sort-direction" onClick={() => setSortDirection(0)}>O</Button>
                    <Button className="sort-direction" onClick={() => setSortDirection(-1)}>Z - A</Button>
                {/*</section>*/}
            </nav>
            <article className="table">
                {loading && <dialog open>Loading tiles...</dialog>}
                {errorMsg ? <dialog open>{errorMsg}</dialog> :
                    sortedTiles.length > 0 ?
                        <section className="tiles">
                            {
                                sortedTiles.map(tile => (
                                    <Tile category={category} key={tile.id} id={tile.id}
                                          name={tile.name} img={tile.image}/>
                                ))
                            }
                        </section> : null
                }
            </article>
        </main>
    );
}

export default Overview;
