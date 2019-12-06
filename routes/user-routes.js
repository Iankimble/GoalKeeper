const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollower,
  removeFollowing
} = require("../controllers/user-crud-controller");
const { requireSignin } = require("../controllers/auth-controller");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);

router.get("/user/:userId", requireSignin, getUser);

router.put("/user/:userId", requireSignin, updateUser);

router.delete("/user/:userId", requireSignin, deleteUser);

//Photo for user
router.get("/user/photo/:userId", userPhoto);

router.param("userId", userById);

module.exports = router;
