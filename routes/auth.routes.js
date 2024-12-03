// routes/auth.router.js
import { Router } from "express";
import {
  showSignupForm,
  processSignup,
  showLoginForm,
  processLogin,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", showSignupForm);
router.post("/signup", processSignup);
router.get("/login", showLoginForm);
router.post("/login", processLogin);

export default router;
