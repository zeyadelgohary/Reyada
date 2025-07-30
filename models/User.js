const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Dummy token
userSchema.methods.generateToken = function () {
  return "mock-token";
};

const User = mongoose.model("User", userSchema);

function validateRegisterUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}

function validateLoginUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
};
