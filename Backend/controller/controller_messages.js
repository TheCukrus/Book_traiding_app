import express from "express";
import model_chat from "../models/model_messages.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants.js";
import { check_session, update_session } from "../utils/middlewares.js";

const router_messages = express.Router();

//POST method to create new chat
router_messages.post("/", check_session, update_session, async (req, res) =>
{
    try
    {
        //Extract sender and receiver IDs from the request body
        const { sender_ID, receive_ID } = req.body;

        if (!sender_ID || !receive_ID)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.ID_NOT_FOUND });
        }

        //Check if a chat already exists between the two users
        const check_for_chat_existance = await model_chat.findOne({
            $or: [
                { users: [sender_ID, receive_ID] },
                { users: [receive_ID, sender_ID] }
            ]
        });

        if (check_for_chat_existance)
        {
            res.status(400).json({ message: ERROR_MESSAGES.CHAT_EXISTS })
        }

        //Create a new chat object in the database
        const new_chat = await model_chat.create(
            {
                "users": [sender_ID, receive_ID],
                "messages": []
            })

        res.status(201).json({ message: SUCCESS_MESSAGES.CHAT_CREATED });
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

export default router_messages;
/*
Retrieving all chats for a particular user
Retrieving all messages for a particular chat
Adding a new message to a particular chat
Updating the unread message count for a particular chat
Updating the timestamp of the last message sent for a particular chat

    "users": [ { type: { type: String },required: true }],
    "messages":
        [
            {
                "sender_ID": { type: String, required: true },
                "receive_ID": { type: String, required: true },
                "content": { type: String, required: true },
                "timestamp": { type: Date, default: Date.now }
            }
        ],
    "last_message_timestamp":{ type: Date, default: null },
    "unread_count": { type: Number, default: 0 }
    */
