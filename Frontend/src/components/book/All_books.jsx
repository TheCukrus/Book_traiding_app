import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import s from "./Book.module.css";
import Book_card from "./Book_card.jsx";

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
        <div className={s.all_books_container}>
            {all_books.length === 0 ?

                <p>Loading</p> :

                all_books.map((ele, i) =>
                (
                    < div key={i} className={s.card_container} >
                        <Book_card image={ele.book.image} title={ele.book.title} author={ele.book.author} rating={<p>There will be rating system</p>} />
                    </div>
                ))
            }

        </div >
    )
}


export default All_books;