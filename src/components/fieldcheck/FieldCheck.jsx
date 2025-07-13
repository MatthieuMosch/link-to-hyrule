import "./FieldCheck.css";

function FieldCheck({check, children}) {
    return (
        <section className={`field-check ${check}`}>
            {children}
        </section>
    );
}

export default FieldCheck;
