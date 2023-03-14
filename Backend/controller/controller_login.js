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
    const create_session = await model_authentication.create(
      {
        "username": req.body.username,
        "session": session
      });

    res.set("Authorization", `Bearer ${token}`)
    // res.cookie("token", session.token)
    res.status(200).json({ "token": session.token });
  }
  catch (err)
  {
    res.status(400).json({ message: err.message })
  }
})

//PUT endpoint for updating an existing session
router_login.put("/", async (req, res) =>
{
  try
  {
    const { username, token } = req.body;

    //Check if username and token is provided
    if (!username)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_USERNAME });
    }

    if (!token)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_TOKEN });
    }

    //Find user session in database
    const user_session = await model_authentication.findOne({ username, "session.token": token });

    if (!user_session)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    //Update session expiration date
    const update_result = await model_authentication.updateOne(
      { "username": username, "session.token": token },
      { $set: { "session.expiration_date": new Date(Date.now() + 30 * 60 * 1000) } }
    );

    //If session not updated, return error
    if (update_result.nModified === 0)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SESSION })
    }

    //Return success message
    res.status(200).json({ message: "Session updated successfully" });
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
})

//DELETE endpoint for logging out a user
router_login.delete("/", async (req, res) =>
{
  try
  {
    const { username, token } = req.body;

    //Check if username and token are provided
    if (!username)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_USERNAME });
    }
    if (!token)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.EMPTY_TOKEN });
    }

    //Find user session in database
    const user_session = await model_authentication.findOne({ username, "session.token": token });

    if (!user_session)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }

    //Clear user's session data
    const delete_session = await model_authentication.updateOne(
      { "username": username },
      { $unset: { "session": "" } }
    );

    //Return success message
    res.status(200).json({ message: "Logged out successfully" });
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
});
export default router_login;