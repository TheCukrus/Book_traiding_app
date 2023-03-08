import React from "react";

const Input = ({ type, name, value, placeholder, onChange, onClick, required, min_length, max_length }) =>
{
    const input = name.charAt(0).toUpperCase() + name.slice(1);
    const valid_input = input ? input.replace("_", " ") : "";

    return (
        <label htmlFor={name}>
            <p>{`${valid_input}:`}</p>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onClick={onClick}
                placeholder={placeholder}
                required={required}
                minLength={min_length}
                maxLength={max_length}
            />
        </label>
    )
}

export default Input;