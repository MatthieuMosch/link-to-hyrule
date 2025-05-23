import "./InputField.css";

function InputField({name, type, placeholder, value, changeHandler, children}) {
    return (
        <label htmlFor={name}>
            <p>{children}</p>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
            />
        </label>
    );
}

export default InputField;
