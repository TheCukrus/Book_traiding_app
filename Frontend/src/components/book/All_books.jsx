import React from "react";
import { Link } from "react-router-dom";
import s from "./Book.module.css";
import Book_card from "./Book_card.jsx";

const All_books = ({ all_books, set_books_id }) =>
{

    return (
        <div className={s.all_books_container}>
            {all_books.length === 0 ?

                <p>Loading</p> :

                all_books.map((ele, i) =>
                (

                    < Link
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
                            rating={<p>There will be rating system</p>}
                        />
                    </Link>
                ))
            }

        </div >
    )
}


export default All_books;