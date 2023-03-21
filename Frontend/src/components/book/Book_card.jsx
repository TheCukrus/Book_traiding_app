import React from "react";
import s from "./Book.module.css";

const Book_card = ({ image, title, author, rating, description }) =>
{
    return (
        <div>
            <div className={s.card_img}>
                <img src={image} alt={title} />
            </div>

            <div className={s.book_detail}>
                <h2 className={s.book_title}>{title}</h2>
                <p className={s.book_author}>By {author}</p>
            </div>

            <div className={s.book_rating}>
                <span className={s.rating_stars}>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                <span className={s.rating_value}>{rating}</span>
            </div>
        </div>
    )
}

export default Book_card;