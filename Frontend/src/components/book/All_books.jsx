import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import s from "./Book.module.css";

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

            {all_books.length === 0 ?

                <p>Loading</p> :

                <div className={s.card_container}>
                    <div className={s.card_img}>
                        <img src={all_books[0].book.image} alt={"img"} />
                    </div>

                    <div>
                        <p>There will be rating system</p>
                    </div>

                    <div>
                        <h2>{all_books[0].book.title}</h2>
                        <p>{all_books[0].book.author}</p>
                    </div>

                    <div>
                        <p>{all_books[0].book.description}</p>
                    </div>
                </div>
            }
        </div>
    )
}


export default All_books;