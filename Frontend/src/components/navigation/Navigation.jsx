import React from "react";
import { Link } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () =>
{
    return (
        <div className={s.container}>
            <Link to="/">Logo</Link>
            <input type="search" placeholder="Search for books" />
            <h1>profile</h1>
            <Link to="/registration">Registration</Link>
            <Link to="/login">Login</Link>

        </div>

    )
}

export default Navigation;