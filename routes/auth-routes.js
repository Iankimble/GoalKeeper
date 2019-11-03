const express = require("express");
const { signup } = require("../controllers/auth-controller");
const { userSignupValidator } = require("../validation");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

module.exports = router;
