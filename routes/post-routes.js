const express = require("express");
const { getPosts, createPost } = require("../controllers/post-controller");
const { createPostValidator } = require("../validation");
const router = express.Router();

router.get("/", getPosts);

router.post("/post", createPostValidator, createPost);

module.exports = router;
