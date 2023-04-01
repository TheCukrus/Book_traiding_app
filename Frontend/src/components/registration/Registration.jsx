import { useState, useEffect } from "react";
import Input from "../../modules/Input.jsx";
import Success_message from "../../modules/messages/Success_message.jsx";
import axios from "axios";
import Error_message from "../../modules/messages/Error_message.jsx";
import { convert_photo_to_string } from "../../modules/Convert_photo_to_string.js";

const Registration = (props) =>
{
    const [err_msg, set_err_msg] = useState("");
    const [input_form, set_input_form] = useState(
        {
            "username": "",
            "email": "",
            "phone_number": "",
            "city": "",
            "description": "",
            "profile_photo": "",
            "password": "",
            "repeat_password": ""
        })

    const handle_input_change = (e) =>
    {
        const { name, value } = e.target;
        set_input_form((prev_states) =>
        ({
            ...prev_states,
            [name]: value
        }))
    };

    const handler_submit = async (e) =>
    {
        e.preventDefault();

        //check email
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(input_form.email))
        {
            props.set_error(true);
            set_err_msg("Please provide a valid email address.")
            return;
        }

        //check phone number
        const phone_regex = /(?:\+\d{1,3}[- ]?)?\d?\d{3}[- ]?\d{5}/;
        if (!phone_regex.test(input_form.phone_number))
        {
            props.set_error(true);
            set_err_msg("Please provide a valid phone number.");
            return;
        }

        //check if passwords match
        if (input_form.password !== input_form.repeat_password)
        {
            props.set_error(true);
            set_err_msg("Passwords do not match!");
            return;
        }

        //check if password contains 8 characters, one Big letter, small letter, number and a special sign
        const passowrd_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
        if (!passowrd_regex.test(input_form.password))
        {
            props.set_error(true);
            set_err_msg("Please provide a password that contains at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
            return;
        }

        //creating a new user
        try
        {
            const new_user = await axios.post("http://127.0.0.1:80/api/v1/user/registration", input_form);
            console.log(new_user)
            props.set_success_message(true);
        }
        catch (err)
        {
            props.set_error(true);
            set_err_msg(err.response);
        }
    }

    //If an error message is present, set a timeout to clear it after 5 sec.
    useEffect(() =>
    {
        if (props.error)
        {
            const time_out = setTimeout(() => props.set_error(false), 5000);
            return () => clearTimeout(time_out);
        }
    }, [props.error]);

    //using to success message disapear in 5 sec
    useEffect(() =>
    {
        if (props.success_message)
        {
            const time_out = setTimeout(() => props.set_success_message(false), 5000);
            return () => clearTimeout(time_out);
        }
    }, [props.success_message]);

    return (
        <div>
            {props.error && <Error_message message={err_msg} />}
            <form onSubmit={handler_submit}>

                {/*Username */}
                <Input
                    type="text"
                    name="username"
                    value={input_form.username}
                    placeholder="Input username"
                    onChange={handle_input_change}
                    required={true}
                    min_length={3}
                    max_length={25}
                />

                {/*Email*/}
                <Input
                    type="email"
                    name="email"
                    value={input_form.email}
                    placeholder="Input your email"
                    onChange={handle_input_change}
                    required={true}
                />

                {/*Phone number*/}
                <Input
                    type="text"
                    name="phone_number"
                    value={input_form.phone_number}
                    placeholder="Input your phone number"
                    onChange={handle_input_change}
                    required={true}
                />

                {/*City*/}
                <Input type="text"
                    name="city"
                    value={input_form.city}
                    placeholder="Input your city"
                    onChange={handle_input_change}
                />

                {/*About you*/}
                <Input
                    type="text"
                    name="description"
                    value={input_form.description}
                    placeholder="Tell something about you"
                    onChange={handle_input_change}
                />

                {/*Profile photo*/}
                <Input
                    type="file"
                    name="profile_photo"
                    onChange={(event) => convert_photo_to_string(set_input_form, event.target.files[0], "profile_photo")}
                />

                {/*Password*/}
                <Input
                    type="password"
                    name="password"
                    value={input_form.password}
                    placeholder="Input your password"
                    onChange={handle_input_change}
                    required={true}
                    min_length={8}
                />

                {/*Repeat password*/}
                <Input
                    type="password"
                    name="repeat_password"
                    value={input_form.repeat_password}
                    placeholder="repeat your password"
                    onChange={handle_input_change}
                    required={true}
                    min_length={8}
                />

                {/*Terms and conditions */}
                <Input
                    type="checkbox"
                    name="terms and conditions"
                    required={true}
                />

                {/*Submit button*/}
                <label htmlFor="submit">
                    <input type="submit" />
                </label>
                {/*Success message apears when user creates an account*/}
                {props.success_message && <Success_message message={`User account created successfully!`} />}
            </form>
        </div>
    )
}

export default Registration;