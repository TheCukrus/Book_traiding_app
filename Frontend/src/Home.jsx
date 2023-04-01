import React from "react";
import All_books from "./components/book/All_books.jsx";



const Home = ({ all_books, set_books_id }) =>
{


    return (
        <div>
            <p> </p>
            <All_books all_books={all_books} set_books_id={set_books_id} />
        </div>
    )
}

export default Home; 