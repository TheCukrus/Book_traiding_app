import mongoose from "mongoose";
import config from "../utils/config.js";

const mongoose_connection = mongoose.createConnection(config.mongoose_url);

const schema_book = new mongoose.Schema(
    {
        "owner": { type: String, required: true },
        "book":
        {
            "title": { type: String, required: true },
            "author": { type: String, required: true },
            "description": { type: String, default: "" },
            "ISBN": { type: String },
            "genre": { type: String },
            "publisher": { type: String },
            "publication_year": { type: String },
            "language": { type: String, required: true },
            "image": { type: String, required: true },
            "price": { type: String },
        },
        "created_at": { type: Date, default: Date.now },
    }
)

const model_book = mongoose_connection.model("book", schema_book, "book");

export default model_book;