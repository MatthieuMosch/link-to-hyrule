import "./Detail.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Detail() {
    const controller = new AbortController();
    const uri = "https://botw-compendium.herokuapp.com/api/v3/compendium/";
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [details, setDetails] = useState({});

    useEffect(() => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            try {
                const response = await axios.get(
                    `${uri}entry/${id}`,
                    {signal: controller.signal}
                );
                setDetails(response.data.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.error("Request: ", err.message);
                } else {
                    setErrorMsg(err.message);
                    console.error("Details error", err);
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
        <main className="details">
            {loading && <h2>Loading tiles...</h2>}
            {errorMsg ? <h2>error {errorMsg}</h2> :
                <article className="detail">
                    <h2>{details.name}</h2>
                    <figure><img src={details.image} alt={details.name}/></figure>
                    <p>{details.description}</p>
                    {details.cooking_effect && <p>Cooking effect: {details.cooking_effect}</p>}
                    {details.hearts_recovered && <p>Recovers {details.hearts_recovered} hearts</p>}
                    {details.common_locations &&
                        <details>
                            <summary>Locations</summary>
                            {details.common_locations.map(location => (
                                <li key={location}>
                                    {location}
                                </li>
                            ))}
                        </details>
                    }
                    {details.drops &&
                        <details>
                            <summary>Drops</summary>
                            {details.drops.map(drop => (
                                <li key={drop}>
                                    {drop}
                                </li>
                            ))}
                        </details>
                    }
                    {details.properties &&
                        <details>
                            <summary>Properties</summary>
                                <li>Attack: {details.properties.attack}</li>
                                <li>Defense: {details.properties.defense}</li>
                        </details>
                    }
                </article>
            }
        </main>
    );
}

export default Detail;
