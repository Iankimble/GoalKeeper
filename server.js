// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Routes
const routes = require("./routes/post-routes");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());

app.use("/", routes);

// Mongo Atlas DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log(`db connection error : ${err.message}`);
    process.exit();
  });

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
