import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>
{
    return (
        <div>
            <p>navbar</p>
            <Link to="create_new_book">create new book</Link>
        </div>
        /*not auth users: home, book filters, about, contacts */
        /*auth users: home, book filters, whitelist, trades, profile*/

    )
}


export default Navbar;