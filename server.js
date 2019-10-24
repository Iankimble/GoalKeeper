// Dependencies
const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");

// Routes
const routes = require("./routes/routes");

// Middleware
app.use(morgan("dev"));

app.use("/", routes);

// Mongo Atlas DB

// Port
const port = 6060;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
