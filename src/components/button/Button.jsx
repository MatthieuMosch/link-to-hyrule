import "./Button.css";

function Button({className, type="button", onClick, children}) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
);
}

export default Button;
