// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Routes
const postRoutes = require("./routes/post-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
// API docs
app.get("/", (req, res) => {
  fs.readFile("docs/api_docs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthroized user" });
  }
});

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
