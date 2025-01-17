import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import { config } from "dotenv";
import {
  setSession,
  resetCookieMaxAge,
} from "./middlewares/session.middleware.js";
import { isAuth, attachUser } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
config();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(setSession);
app.use(resetCookieMaxAge);
app.use(authRouter);

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT, console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err));

// routes
app.get("*", attachUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", isAuth, (req, res) => res.render("smoothies"));
