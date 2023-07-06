//manually creating data in the mongoose database under Product collection.
require("dotenv").config();

const connectDB = require("./database/connect");
const Product = require("./models/products");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //to remove all products there before (not compulsory to do so)
    await Product.deleteMany();
    //to create the data in the db
    await Product.create(jsonProducts);
    console.log("success");
    //exit process after completion
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

// 'node populate' to check if it's a success
