import React from "react";

const Registration = (props) =>
{
    return (
        <div>
            <h1>this is registration page</h1>

            <form>
                <label>
                    <p>Username:</p>
                    <input type="text" placeholder="Input username" />
                </label>

                <label>
                    <p>Email:</p>
                    <input type="email" placeholder="Input your email" />
                </label>

                <label>
                    <p>Phone number:</p>
                    <input type="text" placeholder="Input your phone number" />
                </label>

                <label>
                    <p>City:</p>
                    <input type="text" placeholder="Input your city" />
                </label>

                <label>
                    <p>About you:</p>
                    <input type="text" placeholder="Tell something about you" />
                </label>

                <label>
                    <p>Profile photo:</p>
                    <input type="file" />
                </label>

                <label>
                    <p>Password:</p>
                    <input type="password" placeholder="Input your password" />
                </label>

                <label>
                    <p>Repeat password:</p>
                    <input type="password" placeholder="Input your password" />
                </label>

                <label>
                    <p>Terms and conditions</p>
                    <input type="checkbox" />
                </label>

                <label>
                    <input type="submit" />
                </label>
            </form>
        </div>
    )
}

export default Registration;

/*
Add validation to the form inputs to ensure that they meet certain criteria (e.g. minimum length for passwords, valid email format, etc.).
Add client-side validation to ensure that the passwords match before submitting the form.
Add a backend API call to actually create the user account on the server.
Add error handling to display any server-side errors that occur during the registration process.
Add a success message to display to the user upon successful registration.
*/