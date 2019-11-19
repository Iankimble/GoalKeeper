const _ = require("lodash");
const User = require("../models/User-model");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    // adds profile obj in req with user info
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authoirized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authoirized) {
    return res.status(403).json({
      error: "User is not authorized to perform actions"
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ users });
  }).select("name and email have been updated.");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); // mutate the source obj.
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: "you are not an authorized user to perform this action"
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "error"
      });
    }
    res.json({ msg: "Account has been deleted." });
  });
};
