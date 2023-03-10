import React from "react";
import { useState } from "react";
import Input from "../../modules/Input.jsx";

const Login = (props) =>
{

    const [input_form, set_input_form] = useState(
        { "username": "" },
        { "password": "" }
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

    return (
        <div>
            <h1>Login</h1>

            <form>
                <Input type="text" name="username" value={input_form.username} onChange={handle_input_change} placeholder="Username" required={true} min_length={3} max_length={25} />
                <Input type="password" name="password" value={input_form.password} onChange={handle_input_change} placeholder="Password" required={true} min_length={8} />
                <Input type="checkbox" name="remember_me" />

                <label>
                    <input type="submit" name="submit" value="Log in" />
                </label>
            </form>

            <p>Doesn't have account? Sign up</p>
            <p>Forgot your password? </p>
        </div >
    )
}

export default Login;