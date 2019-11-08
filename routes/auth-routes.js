const express = require("express");
const { signup, signin, signout } = require("../controllers/auth-controller");
const { userById } = require("../controllers/user-crud-controller");
const { userSignupValidator } = require("../validation");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

router.get("/signout", signout);

// routes containing userId, app will execute userById() first
router.param("userId", userById);

module.exports = router;
