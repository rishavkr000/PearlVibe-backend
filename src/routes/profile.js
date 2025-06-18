const express = require("express");
const userAuth = require("../middlewares/auth");
const { validateProfileUpdateData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({data: user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

profileRouter.patch("/profile/update", userAuth, async(req, res) => {
  try {
    validateProfileUpdateData(req)
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.status(201).json({ message: `${loggedInUser.firstName}, your profile is update successfully`, data: loggedInUser })

  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

module.exports = profileRouter;
