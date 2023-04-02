import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Book.module.css";
import Book_card from "./Book_card";

const My_books = ({ user, set_books_id }) =>
{

    const [my_books, set_my_books] = useState(null);

    const fetch_my_books = async () =>
    {
        try
        {
            const token = document.cookie.replace("token=", "");

            const response = await axios.get(`http://127.0.0.1:80/api/v1/book/${user.username}/my_books`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            console.log(response.data.books);
            set_my_books(response.data.books)
        }
        catch (err)
        {
            if (err.response.status === 404)
            {
                return console.log("No books found")
            }
            console.log(err);
        }
    }

    useEffect(() => { fetch_my_books() }, [user])

    return (
        <div className={s.all_books_container}>

            {!my_books ? (
                <p>Loading...</p>
            ) : my_books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                my_books.map((ele, i) =>
                (
                    <Link
                        to={`/book/${ele._id}`}
                        //Added the book ID to the URL path
                        key={i}
                        className={s.card_container}
                        onClick={() => { set_books_id(ele._id) }}
                    >
                        <Book_card
                            image={ele.book.image}
                            title={ele.book.title}
                            author={ele.book.author}
                        />
                    </Link>
                )))
            }

        </div >
    )
}

export default My_books;