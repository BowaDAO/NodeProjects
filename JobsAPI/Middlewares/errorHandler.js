const { CustomApiError } = require("../Errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomApiError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong, try again later");
};

module.exports = errorHandler;
