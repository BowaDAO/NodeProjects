require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

//routes
const authRouter = require("./Routes/auth");
const jobsRouter = require("./Routes/jobs");

//error handler
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`app is listening in port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
