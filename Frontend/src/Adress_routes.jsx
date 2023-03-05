import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Registration from "./components/registration/Registration.jsx";

const Adress_routes = () =>
{
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
    )
}

export default Adress_routes;