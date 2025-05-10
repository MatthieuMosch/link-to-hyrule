import Selector from "../../components/selector/Selector.jsx";

import hyrule from "../../assets/hyrule.jpg";

import "./Home.css";

function Home() {
    return (
        <main className="home">
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
                <Selector img={hyrule}
                          alt="Regions" to="/overview/regions"/>
                <Selector img="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/horse/image"
                          alt="Creatures" to="/overview/creatures"/>
                <Selector img="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/royal_claymore/image"
                          alt="Equipment" to="/overview/equipment"/>
                <Selector img="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/apple/image"
                          alt="Materials" to="/overview/materials"/>
                <Selector img="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/moblin/image"
                          alt="Monsters" to="/overview/monsters"/>
                <Selector img="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/treasure_chest/image"
                          alt="Treasures" to="/overview/treasure"/>
            </section>
        </main>
    );
}

export default Home;
