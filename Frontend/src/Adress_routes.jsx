import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Registration from "./components/registration/Registration.jsx";
import Login from "./components/login/Login.jsx";

const Adress_routes = (props) =>
{
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/registration" element={<Registration error={props.error} set_error={props.set_error} success_message={props.success_message} set_success_message={props.set_success_message} />} />
            <Route path="/login" element={<Login error={props.error} set_error={props.set_error} success_message={props.success_message} set_success_message={props.set_success_message} />} />
        </Routes>
    )
}

export default Adress_routes;