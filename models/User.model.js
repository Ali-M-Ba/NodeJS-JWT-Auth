import { Schema, model } from "mongoose";
import pkg from "validator"; // Import the default CommonJS export
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

const User = model("user", userSchema);

export default User;
