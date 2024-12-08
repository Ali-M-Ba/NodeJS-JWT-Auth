// controllers/auth.controller.js
import User from "../models/User.model.js";

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

  if (error.code === 11000) {
    return { status: 400, message: "This email already exists" };
  }

  if (error.name === "ValidationError") {
    // extracts an array of these validation error objects.
    const errors = Object.values(error.errors).map((err) => err.message);
    return { status: 400, message: "Validation failed", errors };
  }

  return { status: 500, message: "Server error" };
};

export const showSignupForm = (req, res) => {
  res.render("signup");
};

export const processSignup = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  try {
    const savedUser = await newUser.save();
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
