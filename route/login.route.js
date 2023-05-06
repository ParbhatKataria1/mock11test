const express = require("express");
const { UserModel } = require("../model/auth.model");
const login = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");


login.post("/", async (req, res) => {
  let { name, email, password, isAdmin } = req.body;
  let boo = await UserModel.find({ email });
  let { password: hash } = boo[0];
  console.log(hash, password, email);
  try {
    bcrypt.compare(password, hash, function (err, result) {
      // result == true
      if (err) {
        res.status(400).send({ token: "the entered password, is wrong" });
      }
      res
        .status(201)
        .send({ msg: `Bearer ${jwt.sign({ foo: "bar" }, "shhhhh")}` });
    });
  } catch (error) {}
});

module.exports = { login };
