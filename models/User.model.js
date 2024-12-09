// models/User.model.js
import { Schema, model } from "mongoose";
import pkg from "validator"; // Import the default CommonJS export
import bcrypt from "bcrypt";
const { isEmail } = pkg; // Destructure `isEmail` from the default export

const userSchema = new Schema({
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
});

// Middleware that runs before a user doc is saved to the db
userSchema.pre("save", async function (next) {
  // console.log("Preparing to save this user doc:", this);
  // It returns true if the specified field (password in this case) has been modified
  if (this.isModified("password")) {
    // Only hash if password is modified
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model("user", userSchema);

export default User;
