import { verifyToken } from "../utils/token.utils.js";

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
    req.user = encodedToken;

    next();
  } catch (err) {
    console.error("Authentication failed:", err.message);
    return res.redirect("/login");
  }
};
