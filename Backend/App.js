import express from "express";
import router_user from "./controller/controller_user.js";
import router_login from "./controller/controller_login.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


//middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path_1 = path.resolve(__dirname, "..", "Frontend", "build");

app.use(express.static(path_1));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//routes
app.use("/api/v1/user", router_user);
app.use("/api/v1/login", router_login)

export default app;
