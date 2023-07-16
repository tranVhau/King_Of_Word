const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const conn = mongoose
  .connect(
    process.env.URL,
    {
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
