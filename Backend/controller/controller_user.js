import express from "express";
import model_user from "../models/model_user.js";
import model_authentication from "../models/model_authentication.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants.js";
import { check_session, update_session } from "../utils/middlewares.js";
import cloudinary from "../utils/cloudinary_config.js";

const router_user = express.Router();

//Find user by token
router_user.get("/", check_session, update_session, async (req, res) =>
{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        //Find user session in database
        const user_session = await model_authentication.findOne({ "session.token": token });

        if (!user_session)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.TOKEN_UNAUTHORIZED })
        }

        const user_data = await model_user.findOne({ "name": user_session.username });
        if (!user_data)
        {
            return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND })
        }

        res.status(200).json(
            {
                "username": user_data.name,
                "email": user_data.email,
                "location": user_data.location,
                "profile_picture": user_data.profile_picture,
                "phone": user_data.phone,
                "description": user_data.description,
                "id": user_data.id
            })
    }
    catch (err)
    {
        console.log(err.message)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER })
    }
})

//Create new user
router_user.post("/registration", async (req, res) =>
{
    try
    {

        //Checking if required field's isn't empty

        if (!req.body.username || !req.body.phone_number || !req.body.email || !req.body.city || !req.body.password)
        {
            res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS })
            return;
        }
        //Checing is username free
        const check_name = await model_user.findOne({ "name": req.body.username });
        if (check_name !== null)
        {
            res.status(400).json({ message: ERROR_MESSAGES.USER_ALREADY_EXISTS });
            return;
        }

        //Checing phone number
        const check_phone = await model_user.findOne({ "phone": req.body.phone_number });
        if (check_phone !== null)
        {
            res.status(400).json({ message: ERROR_MESSAGES.PHONE_NUMBER_IS_TAKEN });
            return;
        }
        const phone_regex = /(?:\+\d{1,3}[- ]?)?\d?\d{3}[- ]?\d{5}/;
        const is_valid_phone = phone_regex.test(req.body.phone_number);
        if (!is_valid_phone)
        {
            res.status(400).json({ message: ERROR_MESSAGES.INVALID_PHONE_NUMBER });
            return;
        }

        //Checing email
        const check_email = await model_user.findOne({ "email": req.body.email });
        if (check_email !== null)
        {
            res.status(400).json({ message: ERROR_MESSAGES.EMAIL_TAKEN });
            return;
        }
        const email_regex = /\S+@\S+\.\S+/;
        const is_valid_email = email_regex.test(req.body.email);
        if (!is_valid_email)
        {
            res.status(400).json({ message: ERROR_MESSAGES.INVALID_EMAIL })
            return;
        }

        //Check for password
        const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
        const is_valid_password = password_regex.test(req.body.password);
        if (!is_valid_password)
        {
            res.status(400).json({ message: ERROR_MESSAGES.INVALID_PASSWORD_REQUIRMENTS });
            return;
        }

        //Uploading the profile picturee to Cloudinary
        const upladed_image = await cloudinary.uploader.upload(req.body.profile_photo, { folder: "Profile_pictures" });

        //Creting new user
        const new_user = await model_user.create(
            {
                "name": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
                "location": req.body.city,
                "profile_picture": upladed_image.secure_url,
                "phone": req.body.phone_number,
                "description": req.body.description,
            })
        res.status(201).json({ message: SUCCESS_MESSAGES.NEW_USER })
        return;
    }
    catch (err)
    {
        console.log(err.message)
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER });
    }
})


export default router_user;