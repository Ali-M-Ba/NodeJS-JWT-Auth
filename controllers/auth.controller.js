// controllers/auth.controller.js
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { createToken, setCookies } from "../utils/token.utils.js";
import { handleFailedRes, handleSuccessRes } from "../utils/res.utils.js";

export const showSignupForm = (req, res) => {
  res.render("signup");
};

export const processSignup = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  try {
    // Create new user
    const savedUser = await newUser.save();

    const token = createToken({ id: savedUser._id });
    // Store the token in the cookie
    setCookies(res, token);

    handleSuccessRes(res, 201, "Signed up successfully");
  } catch (error) {
    console.error("Error occurred while signing up: ", error);
    handleFailedRes(res, error);
  }
};

export const showLoginForm = (req, res) => {
  res.render("login");
};

export const processLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = createToken({ id: user._id });
    // Store the token in the cookie
    setCookies(res, token);

    handleSuccessRes(res, 200, "Logged in successfully");
  } catch (error) {
    console.error("Error occurred while loging in: ", error);
    handleFailedRes(res, error);
  }
};

export const processLogout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};
