import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const All_books = () =>
{
    const [all_books, set_all_books] = useState([])

    const fetch_all_books = async () =>
    {
        try
        {
            const response = await axios.get("http://127.0.0.1:80/api/v1/book/")
            console.log(response.data.books);
            set_all_books(response.data.books);
        }
        catch (err)
        {
            console.log(err);
        }
    }

    useEffect(() => { fetch_all_books() }, [])

    return (
        <div>
            <h1>There we render all books</h1>
        </div>
    )
}


export default All_books;