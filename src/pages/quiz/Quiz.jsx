import "./Quiz.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputfield/InputField.jsx";
import Score from "../../components/score/Score.jsx";
import {useParams} from "react-router-dom";

function Quiz() {
    const {category} = useParams();
    const controller = new AbortController();
    const uri = `https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`;
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [secrets, setSecrets] = useState([]);
    const [secret, setSecret] = useState({});
    const [guess, setGuess] = useState("");
    const [msg, setMsg] = useState("");
    const [score, setScore] = useState(0);
    const [max, setMax] = useState(0);

    useEffect( () => {
        async function getData() {
            setErrorMsg("");
            setLoading(true);
            try {
                const response = await axios.get(uri, {signal: controller.signal});
                setSecrets(response.data.data);
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
        selectSecret();
    }, [secrets]);

    function selectSecret() {
        const randomIndex = Math.floor(Math.random() * secrets.length);
        setSecret(secrets[randomIndex]);
    }

    function checkGuess(e) {
        e.preventDefault();
        if (guess.toLowerCase() === secret.name.toLowerCase()) {
            setScore((prev) => prev + 1);
            setMsg(secret.name + " was Correct!");
        } else {
            setMsg("The correct answer was: " + secret.name);
        }
        setMax((prev) => prev + 1);
        selectSecret();
    }

    return (
        <main className="quiz">
            <h1>Quiz</h1>
            <h2>What or who is this?</h2>
            {secret &&
                <figure className="quiz-content">
                    <img className="secret" src={secret.image} alt="secret"/>
                    <Score min="0" max={max} score={score} />
                </figure>
            }
            <form className="form-guess" onSubmit={checkGuess}>
                <input type="text" className="guess" placeholder="Enter your guess"
                       value={guess}
                       onChange={(e) => setGuess(e.target.value)} />
                <Button type="submit" onClick={checkGuess}>Check Guess</Button>
            </form>
            {msg && <p>{msg}</p>}
            {loading && <dialog open>Loading secrets...</dialog>}
            {errorMsg && <dialog open>{errorMsg}</dialog>}
        </main>
    );
}

export default Quiz;
