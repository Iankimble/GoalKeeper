const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User-model");

exports.signup = async (req, res) => {
  // finding user in DB by email in req
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    // If email is found than the user already exists and will not create an account
    return res.status(403).json({
      error: "Email already exists"
    });
  // if there is no email it will create a new user
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "sign up successful. Please Login" });
};

exports.signin = (req, res) => {
  // user based on email

  const { _id, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    // if error or no user
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please signin. "
      });
    }
    // make sure email and password matches
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and password do not match."
      });
    }
    // if user generate a token with an id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist token as tkn in a cookie with an expiration time.
    res.cookie("tkn", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};
