import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { convert_photo_to_string } from "../../modules/Convert_photo_to_string.js";
import Input from "../../modules/Input.jsx";
import Success_message from "../../modules/messages/Success_message.jsx";
import Error_message from "../../modules/messages/Error_message.jsx";

const Create_book = ({ user, error, set_error, success_message, set_success_message }) =>
{
    const [err_msg, set_err_msg] = useState("")
    const [input_form, set_input_form] = useState(
        {
            "title": "",
            "author": "",
            "description": "",
            "ISBN": "",
            "genre": "",
            "publisher": "",
            "publication_year": "",
            "language": "",
            "image": "",
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

    const handle_submit = async (e) =>
    {
        e.preventDefault();
        const token = document.cookie.replace("token=", "");

        try
        {
            const create_book = await axios.post("http://127.0.0.1:80/api/v1/book/",
                {
                    "owner": user.username,
                    "book": input_form
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            set_success_message(true);
            set_input_form(
                {
                    "title": "",
                    "author": "",
                    "description": "",
                    "ISBN": "",
                    "genre": "",
                    "publisher": "",
                    "publication_year": "",
                    "language": "",
                    "image": "",
                })
        }
        catch (err)
        {
            if (err.response && err.response.data)
            {
                set_err_msg(err.response.data.message);
                return;
            }
            set_err_msg("An error occurred while processing your request.")
        }
    }

    //If an error message is present, set a timeout to clear it after 5 sec.
    useEffect(() =>
    {
        if (error)
        {
            const time_out = setTimeout(() => set_error(false), 5000);
            return () => clearTimeout(time_out);
        }
    }, [error]);

    //using to success message disapear in 5 sec
    useEffect(() =>
    {
        if (success_message)
        {
            const time_out = setTimeout(() => set_success_message(false), 5000);
            return () => clearTimeout(time_out);
        }
    }, [success_message]);

    return (
        <div>
            <p>Create new book</p>

            <form onSubmit={handle_submit}>
                {/*Title*/}
                <Input
                    type="text"
                    name="title"
                    value={input_form.title}
                    placeholder="Book's title"
                    onChange={handle_input_change}
                    required={true}
                />

                {/*Author*/}
                <Input
                    type="text"
                    name="author"
                    value={input_form.author}
                    placeholder="Book's author"
                    onChange={handle_input_change}
                    required={true}
                />

                {/*Description*/}
                <Input
                    type="text"
                    name="description"
                    value={input_form.description}
                    placeholder="Descripe your book"
                    onChange={handle_input_change}
                    required={false}
                    max_length={200}
                />

                {/*ISBN*/}
                <Input
                    type="text"
                    name="ISBN"
                    value={input_form.ISBN}
                    placeholder="Book's ISBN"
                    onChange={handle_input_change}
                    max_length={20}
                />

                {/*Genre*/}
                <Input
                    type="text"
                    name="genre"
                    value={input_form.genre}
                    placeholder="Book's genre"
                    onChange={handle_input_change}
                />

                {/*Publisher*/}
                <Input
                    type="text"
                    name="publisher"
                    value={input_form.publisher}
                    placeholder="Book's publisher"
                    onChange={handle_input_change}
                />

                {/*Publication_year*/}
                <Input
                    type="text"
                    name="publication_year"
                    value={input_form.publication_year}
                    placeholder="Publication year?"
                    onChange={handle_input_change}
                />

                {/*Language*/}
                <Input
                    type="text"
                    name="language"
                    value={input_form.language}
                    onChange={handle_input_change}
                    placeholder="Book's text language"
                    required={true}
                />

                {/*Image*/}
                <Input
                    type="file"
                    name="image"
                    onChange={(event) => convert_photo_to_string(set_input_form, event.target.files[0], "image")}
                    required={true}
                />

                {/*Submit button*/}
                <label htmlFor="submit">
                    <input type="submit" />
                </label>

                {/*Success message apears when book is created*/}
                {success_message && <Success_message message={`Book created`} />}
                {/*Error message apears when user can't create book*/}
                {error && <Error_message message={err_msg} />}

            </form>
        </div>
    )
}

export default Create_book;