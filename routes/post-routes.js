const express = require("express");
const postController = require("../controllers/post-controller");

const router = express.Router();

router.get("/", postController.getPosts);

router.post("/post", postController.createPost);

module.exports = router;