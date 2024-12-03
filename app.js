import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/node-jwt-auth";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT, console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
