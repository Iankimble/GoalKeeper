const express = require("express");
const { getPosts, createPost } = require("../controllers/post-controller");
const { createPostValidator } = require("../validation");
const { requireSignin } = require("../controllers/auth-controller");
const { userById } = require("../controllers/user-crud-controller");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, createPostValidator, createPost);

router.param("userId", userById);

module.exports = router;
