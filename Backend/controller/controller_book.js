import express from "express";
import model_book from "../models/model_book.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants.js";
import { check_session, update_session } from "../utils/middlewares.js";
import { is_valid_ISBN } from "../utils/helpers.js"
import cloudinary from "../utils/cloudinary_config.js";

const router_book = express.Router();

//Post method to create book data
router_book.post("/", check_session, update_session, async (req, res) =>
{
    const { description, ISBN, genre, publisher, publication_year, title, author, language, image, price } = req.body.book;
    try
    {
        //Check for required fields
        if (!title || !author || !language || !image)
        {
            return res.status(400).json({ message: ERROR_MESSAGES.BOOK_TITLE });
        }

        //Check if ISBN is valid
        if (ISBN && !is_valid_ISBN(ISBN))
        {
            return res.status(400).json({ message: ERROR_MESSAGES.INVALID_ISBN })
        }

        //Uploading the books cover to Cloudinary
        const upladed_image = await cloudinary.uploader.upload(image, { folder: "Books_cover" });

        const response = await model_book.create(
            {
                "owner": req.body.owner,
                "book":
                {
                    "title": title,
                    "author": author,
                    "description": description,
                    "ISBN": ISBN,
                    "genre": genre,
                    "publisher": publisher,
                    "publication_year": publication_year,
                    "language": language,
                    "image": upladed_image.secure_url,
                    "price": price,
                }
            }
        )
        res.status(201).json({ message: SUCCESS_MESSAGES.BOOK_CREATED });

    }
    catch (err)
    {
        console.log(err.message)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//GET method find all books
router_book.get("/", async (req, res) =>
{
    try
    {
        //Fetch all books
        const books = await model_book.find();

        //If no books found, send a custom response message
        if (books.length === 0)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.BOOKS_NOT_FOUND })
        }
        res.status(200).json({ books })
    }
    catch (err)
    {
        console.log(err.message)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//GET method find book by it title
router_book.get("/:title", async (req, res) =>
{
    const { title } = req.params;

    try
    {
        //Fetch book by it title in case-insensitive way
        const book = await model_book.findOne({ title: { $regex: new RegExp(title, "i") } });

        //Doesn't find book
        if (!book)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.BOOKS_NOT_FOUND })
        }

        res.status(200).json({ book });
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//PUT method to update existing book
router_book.put("/", check_session, update_session, async (req, res) =>
{
    try
    {
        //Get the book ID and owner from the request body
        const { book_id, owner } = req.body;

        //Find the book by ID in the database
        const book = await model_book.findById(book_id);

        //If the book doesn't exist, return an error
        if (!book)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.BOOKS_NOT_FOUND })
        }

        //If the athenticated user is not the owner of the book, return an error
        if (owner !== book.owner)
        {
            return res.status(403).json({ message: ERROR_MESSAGES.USER_UNAUTHORIZED })
        }

        //Find and update book
        const response = await model_book.updateOne(
            { _id: id, owner: owner },
            {
                $set: {
                    "price": req.body.price,
                    "book.title": title,
                    "book.author": author,
                    "book.description": description,
                    "book.ISBN": ISBN,
                    "book.genre": genre,
                    "book.publisher": publisher,
                    "book.publication_year": publication_year,
                    "book.language": language,
                    "book.image": image,
                }
            })

        //Check if the book was updated
        if (response.nModified === 0)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.BOOKS_NOT_FOUND })
        }

        res.status(200).json({ message: SUCCESS_MESSAGES.BOOK_UPDATED })
    }
    catch (err)
    {
        console.log(err.message);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//DELETE method to remove book from database
router_book.delete("/", check_session, update_session, async (req, res) =>
{
    try
    {
        //Get the book ID and owner from request body
        const { book_id, owner } = req.body;

        //Find the book by ID in the database
        const book = await model_book.findById(book_id);

        //If the book doesn't exist, return an error
        if (!book)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.BOOKS_NOT_FOUND })
        }

        //If the athenticated user is not the owner of the book, return an error
        if (owner !== book.owner)
        {
            return res.status(403).json({ message: ERROR_MESSAGES.USER_UNAUTHORIZED })
        }

        const delete_book = await model_book.findByIdAndDelete(book_id);

        res.status(200).json({ message: SUCCESS_MESSAGES.BOOK_REMOVED })
    }
    catch (err)
    {
        console.log(err.message);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})


export default router_book;