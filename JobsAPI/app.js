require("express-async-errors");
require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");
// const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./Database/connect");
const authenticateUser = require("./Middlewares/authentication");

//routes
const authRouter = require("./Routes/auth");
const jobsRouter = require("./Routes/jobs");

//error handler
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");

app.use(express.json());

//security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
  })
);

app.use(helmet());
app.use(cors());
// app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`app is listening in port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
