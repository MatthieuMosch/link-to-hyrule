import "./Footer.css";
import novi from "../../assets/NOVI logo wit.svg";

function Footer() {
    return (
        <footer>
            <h5><p>Matthieu Mosch</p><p>student frontend development</p></h5>
            <figure className="logo">
                <a href="https://www.novi.nl/" target="_blank">
                    <img src={novi} alt="logo NOVI"/>
                </a>
            </figure>
        </footer>
    );
}

export default Footer;
