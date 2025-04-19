import "./Button.css";

function Button({variant, onClick, children}) {
    return (
        <button type="button" className={variant} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
