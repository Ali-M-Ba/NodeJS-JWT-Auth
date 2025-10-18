import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import { config } from "dotenv";
import {
  setSession,
  resetCookieMaxAge,
} from "./middlewares/session.middleware.js";
import { isAuth } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

config();
const app = express();
const PORT = process.env.PORT || 3000;

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
mongoose
  .connect("mongodb://localhost:27017/JWT-Auth")
  .then((result) => app.listen(PORT, console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", isAuth, (req, res) => res.render("smoothies"));
