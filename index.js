const express = require("express");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).json({ err: err.message });
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on the port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });
