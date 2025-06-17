const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;

authRouter.post("/signUp", async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
  } = req.body;
  try {
    // validateSignUpData(req);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    const existingEmailId = await UserModel.findOne({ emailId: emailId });
    if (existingEmailId) {
      return res.status(400).json({ message: "User already exists" });
    }
    const data = await user.save();
    const token = await data.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.status(201).json({ message: "Register successful", data: data });
  } catch (err) {
    res.status(500).json({ message: "Error:" + err.message });
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Decrypt the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await user.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.status(200).json({ message: "Login successful", data: user });
  } catch (err) {
    res.status(500).json({ message: "Error:" + err.message });
  }
});

authRouter.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = authRouter;
