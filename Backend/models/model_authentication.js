import mongoose from "mongoose";
import config from "../utils/config.js";

const mongoose_connection = mongoose.createConnection(config.mongoose_url);

const schema_authentication = new mongoose.Schema(
    {
        "username": { type: String, required: true, unique: true },
        "password": { type: String, required: true },
        "auth_method": { type: String, enum: ["username", "google", "facebook"], default: "username" },
        "session": {
            "token": { type: String, required: true },
            "role": { type: String, enum: ["user", "admin"], default: "user" }
        }
    }
);

const model_authentication = mongoose_connection.model("authentication", schema_authentication, "authentication");

export default model_authentication;