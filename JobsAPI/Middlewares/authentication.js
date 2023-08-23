// const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../Errors");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  //the space in the split is very important
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //or
    // const user = await User.findById(payload.id).select('-password')
    // req.user = user
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};
module.exports = authentication;
