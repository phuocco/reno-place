var express = require("express");
var router = express.Router();

var Users = require("../models/users");

var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

//get all users
router.get("/getAll", function (req, res) {
  Users.find()
    .then((data) => res.json({ users: data }))
    .catch((err) => console.log(err));
});

//signup

router.post("/signUp", async (req, res) => {
  arrayCate = [
    { name: "Ford", type: "type a" },
    { name: "Ford", type: "type b" },
  ];
  let email = await Users.findOne({ email: req.body.email });
  let username = await Users.findOne({ username: req.body.username });
  if (email && username) {
    return res.status(400).send("That user already exists!");
  } else {
    user = new Users(
      _.pick(req.body, ["email", "username", "password", "category"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    for (var i = 0; i < arrayCate.length; i++) {
      user.category.push(arrayCate[i]);
    }

    await user.save();

    const token = jwt.sign({ _id: user._id }, "PrivateKey");
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "email", "username"]));
  }
});

module.exports = router;
