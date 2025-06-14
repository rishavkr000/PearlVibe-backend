const express = require("express");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./src/routes/auth");

app.use("/", authRouter);

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
