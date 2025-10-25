import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_MAX_AGE,
  });
};

// Utility function to verify JWT tokens
export const verifyToken = (token) => {
  try {
    if (!token) {
      throw {
        status: 401,
        message: "No authentication token provided.",
      }
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

export const setCookies = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: isProduction,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  };

  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE, 10),
  });
};
