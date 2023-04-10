import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Registration from "./components/registration/Registration.jsx";
import Login from "./components/login/Login.jsx";
import Create_book from "./components/book/Create_book.jsx";
import Book_in_details from "./components/book/Book_in_details.jsx";
import Profile_page from "./components/profile/Profile_page.jsx";
import My_books from "./components/book/My_books.jsx";
import Whitelist from "./components/book/Whitelist.jsx";
import Chat from "./components/chat/Chat.jsx";

const Adress_routes = ({ user, error, set_error, success_message, set_success_message, all_books, set_books_id }) =>
{
    return (
        <Routes>
            <Route exact path="/" element={<Home all_books={all_books} error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} set_books_id={set_books_id} />} />
            <Route path="/registration" element={<Registration error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/login" element={<Login error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/create_new_book" element={<Create_book user={user} error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/book/:id" element={<Book_in_details />} />
            <Route path="/user/:username" element={<Profile_page user={user} />} />
            <Route path="/user/:username/my_books" element={<My_books user={user} set_books_id={set_books_id} />} />
            <Route path="/user/:username/whitelist" element={<Whitelist user={user} />} />
            <Route path="/messages" element={<Chat />} />
        </Routes>
    )
}

export default Adress_routes;