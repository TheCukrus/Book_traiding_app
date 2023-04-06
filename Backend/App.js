import express from "express";
import router_user from "./controller/controller_user.js";
import router_login from "./controller/controller_login.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import router_book from "./controller/controller_book.js";
import router_messages from "./controller/controller_messages.js";
import bodyParser from "body-parser";

const app = express();


//middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path_1 = path.resolve(__dirname, "..", "Frontend", "build");

app.use(express.static(path_1));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1/user", router_user);
app.use("/api/v1/login", router_login);
app.use("/api/v1/book", router_book);
app.use("/api/v1/messages", router_messages);


export default app;
