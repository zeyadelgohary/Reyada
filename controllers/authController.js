const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");

/**
 * @description Register user
 * @route /api/auth/register
 * @method POST
 * @access public
 */
module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const email = req.body.email.toLowerCase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password,salt);

  const newUser = new User({
    email: email,
    userName: req.body.userName,
    password: req.body.password,
    isAdmin: false,
  });

  await newUser.save();

  const token = newUser.generateToken();

  const { password, ...other } = newUser._doc;

  res.status(201).json({ ...other, token });
});

/**
 * @description Login user
 * @route /api/auth/login
 * @method POST
 * @access public
 */
module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const email = req.body.email.toLowerCase();

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
  if(!isPasswordMatch){
      return res.status(400).json({message:"invalid email or password"})
    }

  const token = user.generateToken();
  const { password, ...other } = user._doc;

  res.status(200).json({ ...other, token });
});
