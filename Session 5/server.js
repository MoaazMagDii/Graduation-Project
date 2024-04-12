const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config({path : './config.env'})

const DB = process.env.DATABASE;
const port = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
