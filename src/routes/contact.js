const express = require("express");
const nodemailer = require("nodemailer");
const userAuth = require("../middlewares/auth");
const { validateContactData } = require("../utils/validation");

const contactRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactRouter.post("/send_email", userAuth, (req, res) => {
  const { name, emailId, phone, subject, message } = req.body;

  validateContactData(req);

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: emailId,
    subject: subject,
    text: `Name: ${name}\nEmail: ${emailId}\n\nPhone: ${phone}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Failed to send email" });
    }
    return res.status(200).json({ message: "Email sent successfully" });
  });
});

module.exports = contactRouter;
