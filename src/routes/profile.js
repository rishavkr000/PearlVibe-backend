const express = require("express");
const userAuth = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({data: user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = profileRouter;
