const errorHandler = (error, req, res, next) => {
  res.status(500).send("Something went wrong, try again later");
};

module.exports = errorHandler;
