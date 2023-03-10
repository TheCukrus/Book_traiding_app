import express from "express";
import model_user from "../models/model_user.js";
import model_authentication from "../models/model_authentication.js";
import { ERROR_MESSAGES } from "../utils/constants.js";
import { check_session, update_session } from "../utils/middlewares.js";

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
        res.status(400).json({ message: err.message })
    }
})

//Create new user
router_user.post("/registration", async (req, res) =>
{
    try
    {
        //Checing is username free
        const check_name = await model_user.findOne({ "name": req.body.username });
        if (check_name !== null)
        {
            res.status(400).json({ message: "This username is already taken." });
            return;
        }

        //Checing phone number
        const check_phone = await model_user.findOne({ "phone": req.body.phone_number });
        if (check_phone !== null)
        {
            res.status(400).json({ message: "This phone number is used by onother user." });
            return;
        }
        const phone_regex = /(?:\+\d{1,3}[- ]?)?\d?\d{3}[- ]?\d{5}/;
        const is_valid_phone = phone_regex.test(req.body.phone_number);
        if (!is_valid_phone)
        {
            res.status(400).json({ message: "Please input correct phone number" });
            return;
        }

        //Checing email
        const check_email = await model_user.findOne({ "email": req.body.email });
        if (check_email !== null)
        {
            res.status(400).json({ message: "This email is taken." });
            return;
        }
        const email_regex = /\S+@\S+\.\S+/;
        const is_valid_email = email_regex.test(req.body.email);
        if (!is_valid_email)
        {
            res.status(400).json({ message: "Please input correct email adress." })
            return;
        }

        //Check for password
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        const is_valid_password = password_regex.test(req.body.password);
        if (!is_valid_password)
        {
            res.status(400).json({ message: "Password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character" });
            return;
        }

        //Creting new user
        const new_user = await model_user.create(
            {
                "name": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
                "location": req.body.city,
                "profile_picture": req.body.profile_photo,
                "phone": req.body.phone_number,
                "description": req.body.description,
            })
        res.status(201).json({ message: "New user created" })
        return;

    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
})

//Delete user
router_user.delete("/delete/:id", async (req, res) =>
{
    try
    {
        const user_id = req.params.id;

        if (!user_id)
        {
            res.status(400).json({ message: "User id not provided" });
            return;
        }

        const find_user = await model_user.findById(user_id);
        if (find_user === null)
        {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const remove_user = await model_user.findByIdAndRemove(user_id);
        if (remove_user !== null)
        {
            res.status(200).json({ message: "User deleted succesfully" });
            return;
        }
        res.status(404).json({ message: "User not found" });
        return;
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
        return;
    }
});

export default router_user;