const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const conn = mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    { autoIndex: false }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(`on mongoDB connected: ${error}`);
  });

module.exports = conn;
