import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/User.model.js";

config();

// Utility function to verify JWT tokens
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  // Checks if there is a token
  if (!token) {
    console.error("Token not found.");
    return res.redirect("/login");
  }

  try {
    // Checks if the token is valid
    const encodedToken = await verifyToken(token);
    console.log("Authenticated user:", encodedToken);
    next();
  } catch (err) {
    console.error("Authentication failed:", err.message);
    return res.redirect("/login");
  }
};

export const attachUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.error("Token not found.");
    res.locals.user = null;
    next();
  }

  try {
    const encodedToken = await verifyToken(token);
    console.log("Authenticated user:", encodedToken);

    const user = await User.findById(encodedToken.id);
    if (!user) {
      console.error("User not found.");
      res.locals.user = null;
      next();
    }

    res.locals.user = user.email;
    next();
  } catch (err) {
    console.error("Error injecting user:", err.message);
    res.locals.user = null;
    next();
  }
};
