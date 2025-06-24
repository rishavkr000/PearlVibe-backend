const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, confirmPassword } = req.body;

  if (!firstName || !emailId || !password) {
    throw new Error("Please provide all the required fields");
  }

  if (firstName.length > 20) {
    throw new Error("First name must not be greater than 20 characters");
  }

  if (lastName && lastName.length > 20) {
    throw new Error("Last name must not be greater than 20 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  }

  if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
    throw new Error(
      "Password must be at least 8 characters and include symbols"
    );
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  return true;
};

const validateProfileUpdateData = (req) => {
  const { firstName, lastName, emailId } = req.body;

  if (firstName && firstName.length > 20) {
    throw new Error("First name must not be greater than 20 characters.");
  }

  if (lastName && lastName.length > 20) {
    throw new Error("Last name must not be greater than 20 characters.");
  }

  if (emailId && !validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const validateContactData = (req) => {
  const { name, emailId, phone, subject, message } = req.body;

  if (!name || !emailId || !phone || !subject || !message) {
    throw new Error("Please provide all the required fields");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  }

  if (phone.length !== 10) {
    throw new Error("Phone number must be exactly 10 digits");
  }

  if (!validator.isMobilePhone(phone, "en-IN")) {
    throw new Error("Phone number is not a valid Indian mobile number");
  }

  return true;
};

module.exports = {
  validateSignUpData,
  validateProfileUpdateData,
  validateContactData,
};
