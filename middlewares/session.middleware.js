// middlewares/session.middleware.js
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";

config();

const isProduction = process.env.NODE_ENV === "production";

export const setSession = session({
  secret: process.env.SESSION_SECRET,
  // A session is not created or saved in the session store until you explicitly add data to it.
  // We don't want to save empty sessions!!
  saveUninitialized: false,
  // If the session is not modified during the request, it will not be saved again to the session store.
  // We don't want to update(resave) the session if it's not modify
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection string
    ttl: 14 * 24 * 60 * 60, // Time-to-live: 14 days
    autoRemove: "native", // Let MongoDB handle expired session cleanup
  }).on("error", (err) => {
    console.error("Session store error:", err);
  }),
  cookie: {
    httpOnly: isProduction, // Helps prevent XSS attacks by disallowing JavaScript access
    secure: isProduction, // Ensures cookies are sent over HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: isProduction ? "strict" : "lax", // Strict for production, Lax for development
  },
});

export const resetCookieMaxAge = (req, res, next) => {
  if (req.session) {
    req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // Reset the session epire 7 days
  }
  next();
};
