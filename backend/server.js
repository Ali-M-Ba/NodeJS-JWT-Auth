import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import {
  setSession,
  resetCookieMaxAge,
} from "./middlewares/session.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // use your React dev origin
    credentials: true,
  })
);

app.use(express.static("frontend/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(setSession);
app.use(resetCookieMaxAge);
app.use("/api/auth", authRouter);

// database connection
mongoose
  .connect("mongodb://localhost:27017/JWT-Auth")
  .then((result) => app.listen(PORT, console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err));
