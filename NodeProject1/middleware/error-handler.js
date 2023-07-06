const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomApiError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  return res
    .status(505)
    .json({ message: "something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
