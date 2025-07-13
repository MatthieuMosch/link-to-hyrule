import "./InputField.css";

function InputField({name, type, placeholder, value, readonly, changeHandler, children}) {
    return (
        <label htmlFor={name} className="field-label">
            <p>{children}</p>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
                readOnly={readonly}
                className="field-input"
            />
        </label>
    );
}

export default InputField;
