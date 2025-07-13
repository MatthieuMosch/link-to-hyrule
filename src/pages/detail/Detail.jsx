import "./Detail.css";

import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import sword from "../../assets/mastersword.png";
import CloseButton from "../../components/closebutton/CloseButton.jsx";
import DetailList from "../../components/detaillist/DetailList.jsx";
import DetailObjList from "../../components/detailobjlist/DetailObjList.jsx";
import Marker from "../../components/marker/Marker.jsx";

function Detail() {
    const navigate = useNavigate();
    const controller = new AbortController();
    const baseURI = "https://botw-compendium.herokuapp.com/api/v3";
    // https://botw-compendium.herokuapp.com/api/v3/regions/eldin
    // https://botw-compendium.herokuapp.com/api/v3/compendium/entry/moblin
    // https://botw-compendium.herokuapp.com/api/v3/compendium/entry/108
    const {category, id} = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [details, setDetails] = useState({});

    useEffect(() => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            let uri = baseURI;
            // regions have a different endpoint than the other data
            if (category === "regions") {
                uri += `/regions/${id}`;
            } else {
                uri += `/compendium/entry/${id}`;
            }
            try {
                const response = await axios.get(
                    uri,
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
            {loading && <dialog open>Loading tiles...</dialog>}
            {errorMsg ? <dialog open>{errorMsg}</dialog> :
                <article className="detail">
                    <CloseButton to={`/overview/${category}`} />
                    {/*TODO click on the sword figure to mark as slain*/}
                    {category === "monsters" && <Marker id={id} img={sword} alt="Verslagen"/>}
                    {/*TODO mark materials when collected, count how many - future development*/}
                    {/*TODO mark regions when visited - future development*/}
                    <h2>{details.name}</h2>
                    {category === "regions" ?
                        <figure id="detail_image"><img src={`/regions/${details.name}.jpg`} alt={details.name}/></figure> :
                        <figure id="detail_image"><img src={details.image} alt={details.name}/></figure>
                    }
                    <section id="description">
                        {details.description}
                    </section>
                    {(details.hearts_recovered || details.cooking_effect) &&
                        <ul>
                            <h4>Effects</h4>
                            {(details.hearts_recovered !== 0) && <li>Recovers {details.hearts_recovered} hearts</li>}
                            {details.cooking_effect && <li>Cooking effect: {details.cooking_effect}</li>}
                        </ul>
                    }
                    {details.properties &&
                        <ul>
                            <h4>Properties</h4>
                                <li>Attack: {details.properties.attack}</li>
                                <li>Defense: {details.properties.defense}</li>
                        </ul>
                    }
                    <DetailList description="Locations" items={details.common_locations} />
                    <DetailList description="Drops" items={details.drops} />
                    <DetailList description="Settlements" items={details.settlements} />
                    <DetailObjList description="Shrines" items={details.shrines} />
                    <DetailObjList description="DLC Shrines" items={details.dlc_shrines} />
                </article>
            }
        </main>
    );
}

export default Detail;
