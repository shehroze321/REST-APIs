// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// we are using port 8000
const port = 8000;

// we will create these todoRoutes in the future
const todoRoutes = require("./routes/Todo");

const app = express();

// DB connection
// const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://rest:asghar321@restapis.awzlwaq.mongodb.net/Todo?retryWrites=true&w=majority'
)
  mongoose.set('strictQuery', false);

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the todoRoutes
app.use("/api", todoRoutes);

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
