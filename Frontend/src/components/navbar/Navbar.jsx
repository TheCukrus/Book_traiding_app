import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) =>
{
    return (
        <div>
            <p>navbar</p>
            <Link to="create_new_book">Create new book</Link>
            <Link to={`user/${user.username}/my_books`}>My books</Link>
            <Link to={`user/${user.username}/whitelist`}>Whitelist</Link>
            <p>chat</p>
            <Link to={`messages`}>Chats</Link>
        </div>
        /*not auth users: home, book filters, about, contacts */
        /*auth users: home, book filters, whitelist, trades, profile*/

    )
}


export default Navbar;