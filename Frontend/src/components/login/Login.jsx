import { useState, useEffect } from "react";
import Input from "../../modules/Input.jsx";
import Error_message from "../../modules/messages/Error_message.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import s from "./Login.module.css";

const Login = (props) =>
{
    const [err_msg, set_err_msg] = useState("")
    const [input_form, set_input_form] = useState(
        {
            "username": "",
            "password": ""
        }
    )

    const handle_input_change = (e) =>
    {
        const { name, value } = e.target;

        set_input_form((prevstate) =>
        ({
            ...prevstate,
            [name]: value
        }))
    }

    const handle_submit = async (e) =>
    {
        e.preventDefault();

        //check if username and password fields aren't empty
        if (!input_form.username || !input_form.password)
        {
            props.set_error(true);
            set_err_msg("Input Password and Username!");
            return;
        }

        try
        {
            const new_session = await axios.post("http://127.0.0.1:80/api/v1/login", input_form);
            // Store token in cookies
            document.cookie = `token=${new_session.data.token}; path=/;`;

            // Redirect user to home page after successful login
            window.location.href = "/";

        }
        catch (err)
        {
            props.set_error(true);
            set_err_msg(err.response.data.message || "Failed to login.");
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
    }, [props.error])

    return (
        <div className={s.container}>

            <div className={s.left_side_container}>
                <h1>Login</h1>
                <p>Sign in to continue</p>
                <hr />
                <p>
                    Forgot the password? Click here!
                    {/*Need to add link to recover password*/}
                </p>

            </div>

            <form onSubmit={handle_submit} className={s.login_form}>

                <h2>Sign In</h2>

                <Input type="text" name="username" value={input_form.username} onChange={handle_input_change} placeholder="Username" required={true} min_length={3} max_length={25} />
                <Input type="password" name="password" value={input_form.password} onChange={handle_input_change} placeholder="Password" required={true} min_length={8} />

                <label>
                    <input type="submit" name="submit" value="Login" />
                </label>
            </form>

            <div>
                {props.error && <Error_message messgage={err_msg} />}
            </div >

        </div>
    )
}

export default Login;
