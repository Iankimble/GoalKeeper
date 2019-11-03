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
  res.status(200).json({ user });
};
