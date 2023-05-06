const express = require("express");
const { UserModel } = require("../model/auth.model");
const register = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");

register.post("/", async (req, res) => {
  console.log(req.body, "name");
  let { name, email, password, isAdmin } = req.body;

  try {
    console.log(1);
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: "there is an error in registration" });
      }
      let data = new UserModel({ name, email, password: hash, isAdmin });
      await data.save();
      res.status(201).send({ name, email, password: hash, isAdmin });
    });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "there is an error in registration after the hash" });
  }
});

module.exports = { register };
