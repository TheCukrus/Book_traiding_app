/*
Validate input: 
The controller function should first validate the user's input 
by ensuring that both the username/email and password fields are not empty
and meet any necessary requirements such as minimum length
or specific character requirements.

Find user in database: Once the input has been validated, the controller function should query the database to find a user that matches the provided username/email.

Check password: If a user is found in the database, the controller function should check that the provided password matches the hashed password stored in the database for that user.

Create a session: If the username/email and password are both valid, the controller function should create a new session for the user to allow them to access protected pages on the site or app.

Return response: The controller function should return a response to the client, indicating whether the login was successful or not. If the login was successful, the response should include any relevant data about the user, such as their username or email.

Handle errors: If any errors occur during the login process, such as invalid input or a database connection error, the controller function should handle these errors and return an appropriate error message to the client.

Overall, the login functionality in a controller file should be secure, efficient, and easy to maintain. It should also handle errors gracefully and provide useful feedback to the user.
*/

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
};

//authentication
router_login.post("/auth", async (req, res) =>
{
  try
  {
    //check if username and password are provided
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

    //Save session token in the database
    //...
  }
  catch (err)
  {
    res.status(400).json({ message: err.message })
  }
})

/*
 // Update session in authentication model
    const session = {
      token: token,
      role: user.role,
      expiration_date: expiration_date,
    };
    const update_result = await model_authentication.updateOne(
      { "username": req.body.username },
      { $set: { session: session } }
    );

    if (update_result.nModified === 0) {
      throw new Error("Failed to update session");
    }

    res.status(200).json({ token: token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Session sliding middleware
router_login.use((req, res, next) => {
  if (
    req.path === "/auth" ||  // Ignore authentication requests
    !req.headers.authorization ||  // Ignore requests without an authorization header
    !req.headers.authorization.startsWith("Bearer ")  // Ignore requests with an invalid authorization header
  ) {
    next();
    return;
  }

  // Extract token from authorization header
  const token = req.headers.authorization.slice(7);

  // Find user in authentication model
  model_authentication.findOne({ "session.token": token }, (err, user) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Check if session has expired
    const now = new Date();
    if (now.getTime() >= user.session.expiration_date.getTime()) {
      res.status(401).json({ message: "Session has expired" });
      return;
    }

    // Reset session expiration time to 30 minutes from now
    user.session.expiration_date = new Date(now.getTime() + 30 * 60 * 1000);
    user.save((err) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      next();
    });
  });
});

*/