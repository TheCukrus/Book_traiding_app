import express from "express";
import model_chat from "../models/model_messages.js";

const router_messages = express.Router();

export default router_messages;
/*
Creating a new chat
Retrieving all chats for a particular user
Retrieving all messages for a particular chat
Adding a new message to a particular chat
Updating the unread message count for a particular chat
Updating the timestamp of the last message sent for a particular chat
*/