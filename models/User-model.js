const mongoose = require("mongoose");
// Package that creates random strings and timestamps
const uuidv1 = require("uuid/v1");

// Define
const crypto = require("crypto");

// model for basic user profile data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },

  salt: String,

  created: {
    type: Date,
    default: Date.now()
  },
  updated: Date
});

// Pulling the 'password' string from the 'user' object to create a complex password in place
// of the user created password for better security

// The 'this' keyword is being used to access the hased password

userSchema
  .virtual("password")
  .set(password => {
    // Creating a temporary password called _password
    this._password = password;
    // Creating the timestap
    this.salt = uuidv1();
    // Creating an ecrypted password
    this.hashed_password = this.encryptPassword(password);
  })
  // returning the new ecnypted passwrod
  .get(() => {
    return this._password;
  });

// methods
userSchema.methods = {
  encryptPassword: password => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
