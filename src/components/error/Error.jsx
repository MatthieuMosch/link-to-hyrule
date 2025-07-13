import "./Error.css";

function Error({children}) {
    return (
        <section className="error-message">
            {children}
        </section>
    );
}

export default Error;
