import mongoose from "mongoose";
import config from "../utils/config.js";

const mongoose_connection = mongoose.createConnection(config.mongoose_url);

const schema_chat = new mongoose.Schema(
    {
        "users": [{ type: { type: String, required: true } }],
        "last_message_timestamp": { type: Date, default: null },
        "unread_count": { type: Number, default: 0 },
        "messages":
            [
                {
                    "sender_ID": { type: String, required: true },
                    "receive_ID": { type: String, required: true },
                    "content": { type: String, required: true },
                    "timestamp": { type: Date, default: Date.now }
                }
            ]
    });

const model_chat = mongoose_connection.model("chat", schema_chat);

export default model_chat;