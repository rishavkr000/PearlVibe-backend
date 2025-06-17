const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: "https://tinyurl.com/4v2xv24m"
  }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.LOGIN_TOKEN_EXPIERY });
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
