const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

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

userSchema
  .virtual("password")
  .set(password => {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: ""
};

module.exports = mongoose.model("User", userSchema);
