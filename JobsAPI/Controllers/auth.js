const User = require("../Models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../Errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };

// const jwt = require("jsonwebtoken");
// const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
//   expiresIn: "30d",
// });
