// routes/auth.routers.js
import { Router } from "express";
import {
  showSignupForm,
  processSignup,
  showLoginForm,
  processLogin,
  processLogout,
  sendVerifyOtp,
  verifyAccount,
  requestPasswordReset,
  resetPassword
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", showSignupForm);
router.post("/signup", processSignup);
router.get("/login", showLoginForm);
router.post("/login", processLogin);
router.get("/logout", processLogout);

router.get("/verify-account/otp", sendVerifyOtp);
router.post("/verify-account/confirm", verifyAccount);
router.get("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
