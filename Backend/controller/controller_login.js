import express from "express";
import model_authentication from "../models/model_authentication.js";
import model_user from "../models/model_user.js";
import bcrypt from "bcryptjs";

const router_login = express.Router();

const ERROR_MESSAGES = {
  EMPTY_USERNAME: "Please enter a username",
  EMPTY_PASSWORD: "Please enter a password",
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Invalid password",
  INVALID_SESSION: "Invalid session",
};

//Authentication middleware
const authenticate_session = async (req, res, next) =>
{
  try
  {
    //Find session in database
    const session = await model_authentication.findOne(
      {
        "username": req.body.username,
        "session.token": req.headers.authorization
      });

    if (!session)
    {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_SESSION })
    }

    //Check if session has expired
    const expiration_date = new Date(session.session.expiration_date);
    if (expiration_date < Date.now())
    {
      //Reset session if expired
      await model_authentication.updateOne(
        { "username": req.body.username },
        { $unset: { "session": "" } }
      );
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_SESSION })
    }

    //Update session expiration date
    const update_result = await model_authentication.updateOne(
      { "username": req.body.username },
      { $set: { "session.expiration_date": new Date(Date.now() + 30 * 60 * 1000) } }
    );
    if (update_result.nModified === 0)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SESSION });
    }

    next();
  }
  catch (err)
  {
    res.status(400).json({ message: err.message });
  }
}

//Authentication endpoin
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

    //Update session in database
    const update_result = await model_authentication.updateOne(
      { "username": req.body.username },
      {
        $set: {
          "session.token": token,
          "session.expiration_date": expiration_date
        }
      });
    if (update_result.nModified === 0)
    {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SESSION });
    }

    res.status(200).json({ "token": token });
  }
  catch (err)
  {
    res.status(400).json({ message: err.message })
  }
})

export default router_login;

/*
const logout = async (req, res) => {
  try {
    // Find session in database and delete it
    const session = await model_authentication.findOneAndDelete({
      "session.token": req.headers.authorization,
    });

    if (!session) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_SESSION });
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authenticateSession = async (req, res, next) => {
  try {
    // Find session in database
    const session = await model_authentication.findOne({
      username: req.body.username,
      "session.token": req.headers.authorization,
    });

    if (!session) {
      return res.status(401).json({ message: ERROR_MESSAGES.INVALID_SESSION });
    }

    // Check if session has expired
    const expirationDate = new Date(session.session.expiration_date);
    if (expirationDate < Date.now()) {
      // Reset session if expired
      await model_authentication.updateOne(
        { username: req.body.username },
        { $unset: { session: "" } }
      );
      return res.status(401).json({ message: ERROR
        */