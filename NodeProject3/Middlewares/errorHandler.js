const CustomApiError = require("../Errors/customError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: error.message });
  }
  return res.status(500).send("Something went wrong, try again later");
};

module.exports = errorHandler;
