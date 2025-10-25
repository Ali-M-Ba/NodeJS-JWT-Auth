// controllers/auth.controller.js
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { createToken, setCookies, verifyToken } from "../utils/token.utils.js";
import { handleFailedRes, handleSuccessRes } from "../utils/res.utils.js";
import { transport } from "../config/nodemailer.js";

export const showSignupForm = (req, res) => {
  res.render("signup");
};

export const processSignup = async (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw {
        status: 400,
        message: "Email already exists",
      };
    }

    // Create new user
    const savedUser = await newUser.save();

    const token = createToken({ userId: savedUser._id });
    // Store the token in the cookie
    setCookies(res, token);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userData.email,
      subject: "Welcome",
      text: `Welcome Welcome Welcome ${userData.email}`,
    };

    await transport.sendMail(mailOptions);

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

    const token = createToken({ userId: user._id });
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

export const sendVerifyOtp = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { userId } = verifyToken(token);
    const user = await User.findById(userId);

    if (user.isAccountVerified === true) {
      throw {
        status: 400,
        message: "Account already verified",
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

    user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP`,
    };

    await transport.sendMail(mailOptions);

    handleSuccessRes(res, 200, "OTP sent on Email successfully.");
  } catch (error) {
    console.error(error);
    handleFailedRes(res, error);
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.cookies.token;
    const { userId } = verifyToken(token);
    const user = await User.findById(userId);

    if (user.isAccountVerified === true) {
      throw {
        status: 400,
        message: "Account already verified",
      };
    }

    if (await user.isVerifyOtpValid(String(otp))) {
      user.isAccountVerified = true;
      user.verifyOtp = null;
      user.verifyOtpExpireAt = null;
      await user.save();
    } else {
      throw {
        status: 400,
        message: "Invalid or expired OTP",
      };
    }

    handleSuccessRes(res, 200, "Account verified successfully.");
  } catch (error) {
    console.error(error);
    handleFailedRes(res, error);
  }
};

export const requestPasswordReset = async (req, res) => {
  {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw {
          status: 404,
          message: "User not found.",
        };
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      
      user.resetPasswordOtp = otp;
      user.resetPasswordOtpExpiredAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

      user.save();

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Paaword resetting OTP",
        text: `Your reset OTP: ${otp}.`,
      };

      await transport.sendMail(mailOptions);

      handleSuccessRes(res, 200, "OTP sent on Email successfully.");
    } catch (error) {
      console.error(error);
      handleFailedRes(res, error);
    }
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw { status: 404, message: "User not found." };

    if (await user.isResetOtpValid(String(otp))) {
      user.password = newPassword;
      user.resetPasswordOtp = null;
      user.resetPasswordOtpExpiredAt = null;
      await user.save();
    } else {
      throw {
        status: 400,
        message: "Invalid or expired OTP",
      };
    }

    handleSuccessRes(res, 200, "Password reset successfully.");
  } catch (error) {
    console.error(error);
    handleFailedRes(res, error);
  }
};
