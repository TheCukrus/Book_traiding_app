import React from "react";
import s from "./Message.module.css";

const Success_message = (props) =>
{
    return (
        <div className={s.success_message}>
            <p>{props.message}</p>
        </div>
    )
}

export default Success_message;