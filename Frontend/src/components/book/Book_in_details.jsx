import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Book_in_detail = () =>
{

    const [book_data, set_book_data] = useState(null);
    const [is_loading, set_is_loading] = useState(true);

    //Get current adress and extract id from it
    const location = useLocation();
    const books_id = location.pathname.replace("/book/", "");

    const fetch_books_data = async (id) =>
    {
        try
        {
            const response = await axios.get(`http://127.0.0.1:80/api/v1/book/${id}`)
            console.log(response.data.book)
            set_book_data(response.data.book);
            set_is_loading(false);
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => { fetch_books_data(books_id); }, [])

    if (is_loading)
    {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p>{book_data.owner}</p>
            <p>{book_data.book.title}</p>
            <p>{book_data.book.ISBN}</p>
            <p>{book_data.book.author}</p>
            <p>{book_data.book.description}</p>
            <p>{book_data.book.genre}</p>
            <p>{book_data.book.language}</p>
            <p>{book_data.book.price}</p>
            <p>{book_data.book.publication_year}</p>
            <p>{book_data.book.publisher}</p>
            
            <img src={book_data.book.image} alt={book_data.book.title} />

        </div>
    )
}

export default Book_in_detail;