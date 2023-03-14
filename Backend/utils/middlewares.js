import { ERROR_MESSAGES } from "./constants.js";
import model_authentication from "../models/model_authentication.js";

export const check_session = async (req, res, next) =>
{
    try
    {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
        {
            return res.status(401).json({ message: ERROR_MESSAGES.USER_UNAUTHORIZED })
        }

        //Find user session in database
        const user_session = await model_authentication.findOne({ "session.token": token }, "session.expiration_date");

        if (!user_session)
        {
            res.clearCookie("token");
            return res.status(404).json({ message: ERROR_MESSAGES.TOKEN_UNAUTHORIZED })
        }

        //Check session expiration date
        const expiration_date = new Date(user_session.session.expiration_date);
        if (expiration_date < new Date())
        {
            await delete_session(req, res);
            return res.status(401).json({ message: ERROR_MESSAGES.SESSION_TIME_OUT })
        }

        next();
    }
    catch (err)
    {
        res.status(400).json({ message: err.message })
    }
}

export const update_session = async (req, res, next) =>
{
    try
    {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token)
        {
            return res.status(401).json({ message: ERROR_MESSAGES.USER_UNAUTHORIZED })
        }

        //Find user session in database
        const user_session = await model_authentication.findOne({ "session.token": token });

        if (!user_session)
        {
            res.clearCookie("token");
            return res.status(404).json({ message: ERROR_MESSAGES.TOKEN_UNAUTHORIZED })
        }

        //Create new expiration date
        const updated_date = new Date(Date.now() + 30 * 60 * 1000);

        const updated_session = await model_authentication.findOneAndUpdate(
            { "session.token": token },
            { $set: { "session.expiration_date": updated_date }, },
            { new: true }
        );

        //If session not updated, return error
        if (!updated_session)
        {
            return res.status(500).json({ message: ERROR_MESSAGES.INVALID_SESSION })
        }

        next()
    }
    catch (err)
    {
        res.status(500).json({ message: err.message })
    }
}


export const delete_session = async (req, res) =>
{
    try
    {
        const token = req.headers.authorization?.split(" ")[1];

        //Find user session in database
        const user_session = await model_authentication.findOne({ "session.token": token });

        if (!user_session)
        {
            return res.status(404).json({ message: ERROR_MESSAGES.TOKEN_UNAUTHORIZED })
        }

        //Delete session from database
        await model_authentication.deleteOne({ "session.token": token });

        //Delete token from cookie
        res.clearCookie("token");
    }
    catch (err)
    {
        return res.status(500).json({ message: err.message });
    }
}