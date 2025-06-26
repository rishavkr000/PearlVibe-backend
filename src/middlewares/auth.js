const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) return res.status(401).json({ message: "Please login" });

    const tokenVerification = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = tokenVerification;

    const user = await User.findOne({_id, isDeleted: false});

    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = userAuth;
