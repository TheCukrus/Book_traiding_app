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

//GET method to retriev all chats for a particular user
router_messages.get("/chats", check_session, update_session, async (req, res) => 
{
    try
    {
        //Retrieve all chats that involve the user
        const chats = await model_chat.find({}).populate("users", "username");
        res.status(200).json({ chats });
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
})

//GET method to retrieving all messages for a particular chat
router_messages.get("/:chat_id", check_session, update_session, async (req, res) =>
{
    try
    {
        const { chat_id } = req.params;

        //Check if the chat exists
        const chat = await model_chat.findById(chat_id);
        if (!chat)
        {
            res.status(404).json({ message: ERROR_MESSAGES.CHAT_NOT_EXISTS })
        }

        //Retrieve all messages for the chat and populate the sender and receiver IDs with their usernames
        const messages = await model_chat.findById(chat_id).populate("messages.sender_ID", "username").populate("messages.receive_ID", "username");

        res.status(200).json({ messages })

    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//POST method adding a new message to a particular chat
router_messages.post("/:chat_id", check_session, update_session, async (req, res) =>
{
    try
    {
        const { chat_id } = req.params;
        const { sender_ID, receive_ID, content } = req.body;

        //Check if chat exists
        const chat = await model_chat.findById(chat_id);
        if (!chat)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.CHAT_NOT_EXISTS })
        }

        //Add a new message to the chat
        chat.messages.push({ sender_ID, receive_ID, content });
        chat.last_message_timestamp = new Date();
        chat.unread_count += 1;
        await chat.save();

        res.status(200).json({ message: SUCCESS_MESSAGES.MESSAGE_SENT })
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//PUT method for updating the unread message count for a particular chat
router_messages.put("/:chat_id", check_session, update_session, async (req, res) =>
{
    try
    {
        const { chat_id } = req.params;

        //Check if chat exists 
        const chat = await model_chat.findById(chat_id);
        if (!chat)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.CHAT_NOT_EXISTS })
        }

        //Update the unread message count to 0 for the chat
        chat.unread_count = 0;
        await chat.save();

        res.status(200).json({ message: SUCCESS_MESSAGES.UNREAD_COUNT_UPDATED })
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//PUT method to update the timestamp of the last message send for a particular chat
router_messages.put("/:chat_id/last-message-timestamp", check_session, update_session, async (req, res) =>
{
    try
    {
        const { chat_id } = req.params;

        //check if chat exists
        const chat = await model_chat.findById(chat_id);
        if (!chat)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.CHAT_NOT_EXISTS })
        }

        //Update the last message timestamp for the chat to the current time
        chat.last_message_timestamp = new Date();
        await chat.save();

        res.status(200).json({ message: SUCCESS_MESSAGES.LAST_MESSAGE_TIMESTAMP })
    }
    catch (err)
    {
        console.log(err)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

export default router_messages;