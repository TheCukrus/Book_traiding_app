import express from "express";
import model_user from "../models/model_user.js";

const router_user = express.Router();


//create new user
router_user.post("/registration", async (req, res) =>
{
    try
    {
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
        res.status(200).json({ message: "New user created" })
        res.end();
        return;

    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
        res.end();
    }
})

export default router_user;