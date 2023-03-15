import express from "express";
import model_authentication from "../models/model_authentication.js";
import model_user from "../models/model_user.js";
import bcrypt from "bcryptjs";
import { ERROR_MESSAGES } from "../utils/constants.js";

const router_login = express.Router();

//POST endpoint to create a new session
router_login.post("/", async (req, res) =>
{
  try
  {
    //Check if username and password are provided
    if (!req.body.username)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_USERNAME })
    }

    if (!req.body.password)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_PASSWORD })
    }

    //Find user in database
    const user = await model_user.findOne({ "name": req.body.username });
    if (!user)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    // Check password
    const password_matches = await bcrypt.compare(req.body.password, user.password);
    if (!password_matches)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_PASSWORD })
    }

    //Generate session token
    const token = await bcrypt.hash(new Date().toString(), 10);

    //session token expiration data
    const expiration_date = new Date(Date.now() + 30 * 60 * 1000);

    const session =
    {
      "token": token,
      "expiration_date": expiration_date
    };

    //creating new session
    const create_session = await model_authentication.findOneAndUpdate(
      { "username": req.body.username },
      {
        "username": req.body.username,
        "session": session
      },
      { new: true, upsert: true });

    res.set("Authorization", `Bearer ${token}`)
    // res.cookie("token", session.token)
    res.status(200).json({ "token": session.token });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message })
  }
})

//DELETE endpoint for logging out a user
router_login.delete("/", async (req, res) =>
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

    //Clear user's session data
    const delete_session = await model_authentication.updateOne(
      {
        $unset: {
          "session": "",
          "auth_method": ""
        }
      }
    );

    //Return success message
    res.status(200).json({ message: "Logged out successfully" });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
});

export default router_login;