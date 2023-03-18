import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Registration from "./components/registration/Registration.jsx";
import Login from "./components/login/Login.jsx";
import Create_book from "./components/book/Create_book.jsx";

const Adress_routes = ({ user, error, set_error, success_message, set_success_message }) =>
{
    return (
        <Routes>
            <Route exact path="/" element={<Home error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/registration" element={<Registration error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/login" element={<Login error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
            <Route path="/create_new_book" element={<Create_book user={user} error={error} set_error={set_error} success_message={success_message} set_success_message={set_success_message} />} />
        </Routes>
    )
}

export default Adress_routes;