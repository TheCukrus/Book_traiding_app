import express from "express";
import model_user from "../models/model_user.js";

const router_user = express.Router();

//

//create new user
router_user.post("/registration", async (req, res) =>
{
    try
    {
        //checing is username free
        const check_name = await model_user.findOne({ "name": req.body.name });
        if (check_name !== null)
        {
            res.status(400).json({ message: "This username is already taken." });
            return;
        }

        //checing phone number
        const check_phone = await model_user.findOne({ "phone": req.body.phone });
        if (check_phone !== null)
        {
            res.status(400).json({ message: "This phone number is used by onother user." });
            return;
        }
        const phone_regex = /^(\+?\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
        const is_valid_phone = phone_regex.test(req.body.phone);
        if (!is_valid_phone)
        {
            res.status(400).json({ message: "Please input correct number" });
            return;
        }

        //checing email
        const check_email = await model_user.findOne({ "email": req.body.email });
        if (check_email !== null)
        {
            res.status(400).json({ message: "This email is taken." });
            return;
        }
        const email_regex = /^\S+@\S+\.\S+$/;
        const is_valid_email = email_regex.test(req.body.email);
        if (!is_valid_email)
        {
            res.status(400).json({ message: "Please input correct email adress." })
            return;
        }

        //check for password
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        const is_valid_password = password_regex.test(req.body.password);
        if (!is_valid_password)
        {
            res.status(400).json({ message: "Password should have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character" });
            return;
        }

        //creting new user
        const new_user = await model_user.create(
            {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "location": req.body.location,
                "profile_Picture": req.body.profile_Picture,
                "phone": req.body.phone,
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

//delete user
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