require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./Routes/main");
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");

app.use(express.json());
app.use(express.static("./Public"));

app.use("/api/v1", mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
