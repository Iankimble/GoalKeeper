const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  updatePost,
  deletePost
} = require("../controllers/post-controller");
const { createPostValidator } = require("../validation");
const { requireSignin } = require("../controllers/auth-controller");
const { userById } = require("../controllers/user-crud-controller");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postByUser);

router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.delete("/post/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);

router.param("postId", postById);

module.exports = router;
