import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Homepage</h1>
            <Link to="/profile">Profile</Link>
            <Link to="/detail">Detail</Link>
            <Button onClick={() => navigate("/overview/creatures")} variant="primary">
                Overview Creatures
            </Button>
            <Button onClick={() => navigate("/overview/equipment")} variant="primary">
                Overview Equipment
            </Button>
            <Button onClick={() => navigate("/overview/materials")} variant="primary">
                Overview Materials
            </Button>
            <Button onClick={() => navigate("/overview/monsters")} variant="primary">
                Overview Monsters
            </Button>
            <Button onClick={() => navigate("/overview/treasure")} variant="primary">
                Overview Treasure
            </Button>
        </>
    );
}

export default Home;
