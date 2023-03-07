import { useState } from "react";
import { useEffect } from "react";

const Registration = (props) =>
{
    const [input_form, set_input_form] = useState(
        {
            "username": "",
            "email": "",
            "phone_number": "",
            "city": "",
            "about_you": "",
            "profile_photo": "",
            "password": "",
            "repeat_password": ""
        })

    const handle_input_change = (e) =>
    {
        const { name, value, files } = e.target;
        set_input_form((prev_states) =>
        ({
            ...prev_states,
            [name]: name === "profile_photo" ? files[0] : value,
        }))
    };

    const handler_submit = (e) =>
    {
        e.preventDefault();
        if (input_form.password !== input_form.repeat_password)
        {
            props.set_error("Passwords do not match!");
            return;
        }
    }

    //using to error message dissapear in 5 sec.
    useEffect(() =>
    {
        if (props.error !== "")
        {
            const time_out = setTimeout(() => props.set_error(""), 5000);
            return () => clearTimeout(time_out);
        }
    }, [props.error]);

    return (
        <div>
            <h1>this is registration page</h1>
            {props.error && <p>{props.error}</p>}
            <form onSubmit={handler_submit}>
                <label htmlFor="username">
                    <p>Username:</p>
                    <input type="text" name="username" value={input_form.username} onChange={handle_input_change} placeholder="Input username" />
                </label>

                <label htmlFor="email">
                    <p>Email:</p>
                    <input type="email" name="email" value={input_form.email} onChange={handle_input_change} placeholder="Input your email" />
                </label>

                <label htmlFor="phone_number">
                    <p>Phone number:</p>
                    <input type="text" name="phone_number" value={input_form.phone_number} onChange={handle_input_change} placeholder="Input your phone number" />
                </label>

                <label htmlFor="city">
                    <p>City:</p>
                    <input type="text" name="city" value={input_form.city} onChange={handle_input_change} placeholder="Input your city" />
                </label>

                <label htmlFor="about_you">
                    <p>About you:</p>
                    <input type="text" name="about_you" value={input_form.about_you} onChange={handle_input_change} placeholder="Tell something about you" />
                </label>

                <label htmlFor="profile_photo">
                    <p>Profile photo:</p>
                    <input type="file" name="profile_photo" value={input_form.profile_photo} onChange={handle_input_change} />
                </label>

                <label htmlFor="password">
                    <p>Password:</p>
                    <input type="password" name="password" value={input_form.password} onChange={handle_input_change} placeholder="Input your password" />
                </label>

                <label htmlFor="repeat_password">
                    <p>Repeat password:</p>
                    <input type="password" name="repeat_password" value={input_form.repeat_password} onChange={handle_input_change} placeholder="Repeat your password" />
                </label>

                <label htmlFor="term_and_conditions">
                    <p>Terms and conditions</p>
                    <input type="checkbox" />
                </label>

                <label htmlFor="submit">
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
Add a success message to display to the user upon successful registration.
*/