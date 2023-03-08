import React from "react";
import s from "./Message.module.css"

const Error_message = (props) =>
{
    return (
        <div className={s.Error_message}>
            <p>{props.message}</p>
        </div>
    )
}

export default Error_message;