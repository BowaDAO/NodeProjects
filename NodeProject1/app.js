const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// .then(() => console.log("Connected to the DB..."))
// .catch((error) => console.log(error));

//middleware
app.use(express.json());
// //middleware to
// app.use(express.static('/public'))

//routes
app.use("/api/v1/tasks", tasks);

//middleware to show not found (shoud never come before the route)
app.use(notFound);
//middlewar handling error
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
