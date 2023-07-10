const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../Errors");
// const CustomApiError = require("../Errors/customError");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // throw new CustomApiError("No token provided", 401);
    throw new UnAuthenticatedError("No token provided");
  }
  const token = authHeader.split("")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }
};
module.exports = authenticationMiddleware;
