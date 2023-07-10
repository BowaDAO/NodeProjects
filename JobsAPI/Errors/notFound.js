const { CustomApiError } = require("./customError");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;

// const notFound = (req, res) => {
//   res.status(404).send("route does not exist");
// };

// module.exports = notFound;
