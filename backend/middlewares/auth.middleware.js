import { handleFailedRes } from "../utils/res.utils.js";
import { verifyToken } from "../utils/token.utils.js";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  // Checks if there is a token
  if (!token) {
    console.error("Token not found.");
    return handleFailedRes(res, { status: 401, message: "Not authenticated." });
  }

  try {
    // Checks if the token is valid
    const encodedToken = verifyToken(token);
    req.user = encodedToken;

    next();
  } catch (err) {
    console.error("Authentication failed:", err.message);
    return handleFailedRes(res, {
      status: 401,
      message: "Invalid or expired token.",
    });
  }
};
