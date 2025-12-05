// models/User.model.js
import { Schema, model } from "mongoose";
import pkg from "validator"; // Import the default CommonJS export
import bcrypt from "bcrypt";
const { isEmail } = pkg; // Destructure `isEmail` from the default export

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verifyOtp: {
    type: String,
  },
  verifyOtpExpireAt: {
    type: Date,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiredAt: {
    type: Date,
  },
});

// Middleware that runs before a user doc is saved to the db
userSchema.pre("save", async function (next) {
  // console.log("Preparing to save this user doc:", this);
  // It returns true if the specified field (password in this case) has been modified
  if (this.isModified("password") && this.password) {
    // Only hash if password is modified
    this.password = await bcrypt.hash(this.password, 10);
  }

  // 🔐 Hash OTP before saving (for both verifyOtp and resetOtp)
  // this.verifyOtp checks whether verifyOtp actually has a non-empty value.
  if (this.isModified("verifyOtp") && this.verifyOtp) {
    this.verifyOtp = await bcrypt.hash(this.verifyOtp, 10);
  }
  next();
});

// ✅ Compare OTP safely
userSchema.methods.isVerifyOtpValid = async function (otp) {
  if (!this.verifyOtp || !this.verifyOtpExpireAt) return false;
  const isValidTime = new Date() < this.verifyOtpExpireAt;
  const isMatch = await bcrypt.compare(otp, this.verifyOtp);
  return isValidTime && isMatch;
};

userSchema.methods.isResetTokenValid = async function () {
  if (!this.resetPasswordTokenExpiredAt) return false;
  const isValidTime = new Date() < this.resetPasswordTokenExpiredAt;
  return isValidTime;
};

const User = model("user", userSchema);

export default User;
