const express = require("express");
const { getPosts, createPost } = require("../controllers/post-controller");
const validator = require("../validation");
const router = express.Router();

router.get("/", getPosts);

router.post("/post", validator.createPostValidator, createPost);

module.exports = router;
