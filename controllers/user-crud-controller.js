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
if(!authoirized){
    return res.status(403).json({
        error: 'User is not authorized to perform actions'
    })
}
};
