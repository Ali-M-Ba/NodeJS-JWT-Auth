// controllers/auth.controller.js
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const isProduction = process.env.NODE_ENV === "production";
const maxAge = 14 * 24 * 60 * 60; // 14 days in seconds

const handleErrors = (error) => {
  // {
  //   name: "ValidationError",
  //   message: "user validation failed: password: Path `password` is shorter than the minimum allowed length (6).",
  //   errors: {
  //     password: {
  //       message: "Path `password` is shorter than the minimum allowed length (6).",
  //       name: "ValidatorError",
  //       path: "password",
  //       kind: "minlength",
  //       value: "12345"
  //     }
  //   }
  // }
  // {
  //   index: 0,
  //   code: 11000,
  //   keyPattern: { email: 1 },
  //   keyValue: { email: 'ali@gmail.com' },
  //   [Symbol(errorLabels)]: Set(0) {}
  // }
  let errRes = {
    status: 500, // Default to internal server error
    message: "An unexpected error occurred.",
    errors: [], // Array to collect detailed error messages
  };

  // 1. Handle Mongoose Validation Errors
  if (error.name === "ValidationError") {
    // extracts an array of these validation error objects.
    errRes.status = 400;
    errRes.message = "Validation failed";
    errRes.errors = Object.values(error.errors).map((err) => err.message);
  }

  // 2. Handle MongoDB Duplicate Key Errors (e.g., unique fields like email)
  if (error.code === 11000) {
    errRes.status = 400;
    errRes.message = "Duplicate field value entered";
    const field = Object.keys(error.keyValue)[0]; // Get the duplicate field (e.g., 'email')
    errRes.errors.push(
      `The ${field} '${error.keyValue[field]}' is already in use.`
    );
  }

  return errRes;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const showSignupForm = (req, res) => {
  res.render("signup");
};

export const processSignup = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  try {
    // Create new user
    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);
    // Store the token in the cookie
    res.cookie("token", token, {
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: maxAge * 1000, // 14 days in milliseconds
      sameSite: isProduction ? "strict" : "lax",
    });

    res.status(201).json({ success: true, savedUser });
  } catch (error) {
    console.error("Error occurred while signing up: ", error);
    const err = handleErrors(error);
    res
      .status(err.status)
      .json({ success: false, message: err.message, errors: err.errors || [] });
  }
};

export const showLoginForm = (req, res) => {
  res.render("login");
};

export const processLogin = (req, res) => {
  const userData = req.body;
  res.send(userData);
};
