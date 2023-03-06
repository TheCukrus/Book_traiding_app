import { useState, createContext } from "react";
import Error_context from "./Error_context.jsx";


export const Error_context = createContext({
    error_message: "",
    set_error: () => { },
    set_show_error: () => { },
    show_error: false
});

const Error_provider = ({ children }) =>
{
    const [error_message, set_error_message] = useState("");
    const [show_error, set_show_error] = useState(false);

    const set_error = (message) =>
    {
        set_error_message(message);
        set_show_error(true);
    }

    return (
        <Error_context.Provider value={{ error_message, set_error, set_show_error, show_error }}>
            {children}
        </Error_context.Provider>
    )
}

export default Error_provider;