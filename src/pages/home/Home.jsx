import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

import "./Home.css";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <section className="home-story">
                <p>
                    Link traveled all over Hyrule and encountered many creatures and monsters each with their own
                    characteristics. On his travels he learned a lot about what nature can offer and how to prepare a
                    healthy and beneficiary meals. Link, as the good and helpful knight he is, likes to shares his
                    knowledge with you.
                </p>
                <p>
                    Click on each of the buttons below to learn more about Hyrule and what you can find there.
                </p>
            </section>
            <section className="selectors">
                <Button className="selector" onClick={() => navigate("/overview/creatures")}>
                    <figure className="selector-image">
                        <img src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/horse/image"
                             alt="Creatures"/>
                    </figure>
                </Button>
                <Button className="selector" onClick={() => navigate("/overview/equipment")}>
                    <figure className="selector-image">
                        <img src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/royal_claymore/image"
                             alt="Equipment"/>
                    </figure>
                </Button>
                <Button className="selector" onClick={() => navigate("/overview/materials")}>
                    <figure className="selector-image">
                        <img src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/apple/image"
                             alt="Materials"/>
                    </figure>
                </Button>
                <Button className="selector" onClick={() => navigate("/overview/monsters")}>
                    <figure className="selector-image">
                        <img src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/moblin/image"
                             alt="Monsters"/>
                    </figure>
                </Button>
                <Button className="selector" onClick={() => navigate("/overview/treasure")}>
                    <figure className="selector-image">
                        <img src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/treasure_chest/image"
                             alt="Treasures"/>
                    </figure>
                </Button>
            </section>
        </>
    );
}

export default Home;
