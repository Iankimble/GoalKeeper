const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/user-crud-controller");
const { requireSignin } = require("../controllers/auth-controller");

const router = express.Router();

router.get("/users", requireSignin, allUsers);

router.get("/user/:userId", requireSignin, getUser);

router.put("/user/:userId", requireSignin, updateUser);

router.delete("/user/:userId", requireSignin, deleteUser);

router.param("userId", userById);

module.exports = router;
