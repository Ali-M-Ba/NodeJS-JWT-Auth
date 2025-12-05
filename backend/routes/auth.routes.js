// routes/auth.routers.js
import { Router } from "express";
import {
  processSignup,
  processLogin,
  processLogout,
  sendVerifyOtp,
  verifyAccount,
  requestPasswordReset,
  resetPassword,
  getUserInfo
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", getUserInfo);
router.post("/signup", processSignup);
router.post("/login", processLogin);
router.post("/logout", processLogout);

router.get("/verify-account/otp", isAuth,  sendVerifyOtp);
router.post("/verify-account/confirm", verifyAccount);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
