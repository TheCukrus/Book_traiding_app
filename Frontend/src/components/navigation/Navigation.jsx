import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = ({ user, set_user, is_authenticated, set_is_authenticated }) =>
{
    const handle_logout = async () =>
    {
        try
        {
            //Get token from headers
            const token = document.cookie.replace("token=", "");

            const logout = await axios.delete("http://127.0.0.1:80/api/v1/login",
                { headers: { Authorization: `Bearer ${token}` }, });

            if (logout.status !== 200)
            {
                return console.log("logout failed")
            }
            set_is_authenticated(false);
            set_user({})
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

            // Redirect user to home page after successful logout
            window.location.href = "/";
        }
        catch (err)
        {
            console.log(err);
        }
    }

    return (
        <div className={s.container}>
            <Link to="/">Logo</Link>
            <input type="search" placeholder="Search for books" />

            {!is_authenticated ?
                <div>
                    <Link to="/registration">Registration</Link>
                    <Link to="/login">Login</Link>
                </div>
                :
                <div>
                    <h4>{user.username}</h4>
                    <p>profile</p>
                    <p><button onClick={handle_logout}>Logout</button></p>
                </div>}

        </div>

    )
}

export default Navigation;