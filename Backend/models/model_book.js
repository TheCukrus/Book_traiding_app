import mongoose from "mongoose";
import config from "../utils/config.js";

const mongoose_connection = mongoose.createConnection(config.mongoose_url);

const schema_book = new mongoose.Schema(
    {
        "owner": { type: String, require: true },
        "price": { type: String },
        "book":
        {
            "title": { type: String, require: true },
            "author": { type: String, require: true },
            "description": { type: String, default: "" },
            "ISBN": { type: String },
            "genre": { type: String },
            "publisher": { type: String },
            "publication_year": { type: String },
            "language": { type: String, require: true },
            "image": { type: String, require: true },
        }
    }
)

const model_book = mongoose_connection.model("book", schema_book, "book");

export default model_book;