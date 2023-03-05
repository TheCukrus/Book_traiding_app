import React from "react";
import { Link } from "react-router-dom";

const Navigation = () =>
{
    return (
        <div>
            <Link to="/">Logo</Link>
            <Link to="/registration">Registration</Link>
            <h1>Logo</h1>
            <input type="search" placeholder="Search for books" />
            <h1>profile</h1>
            <div>
                {/*Meniu items*/}
                <h1>Home</h1>
                <h1>Profile</h1>
                <h1>About</h1>
                <h1>Contact</h1>
            </div>
        </div>

    )
}

export default Navigation;