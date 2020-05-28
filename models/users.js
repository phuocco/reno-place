var mongoose = require("mongoose");

var Categories = new mongoose.Schema({
  name: String,
  type: String,
});

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true, trim: true },
  username: { type: String, unique: true, require: true, trim: true },
  password: { type: String, require: true },
  category: [Categories],
});

var Users = mongoose.model("User", UserSchema);
module.exports = Users;
