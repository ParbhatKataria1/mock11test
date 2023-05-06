const express = require("express");
const { UserModel } = require("../model/auth.model");
const orders = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");

// orders.use((req, res, next) => {
//   let token = req.headers.authorization;
//   token = token.split(" ")[1];
//   next()
//   try {
//     jwt.verify(token, "shhhhh", function (err, decoded) {
//       if (decoded.foo) next();
//       console.log(decoded, token, "value");
//       res.status(400).send({ msg: "stopped by middleware" });
//     });
//   } catch (error) {
//     res.status(400).send({ msg: "stopped by middleware outside" });
//   }
// });

orders.get("/", async (req, res) => {
  try {
    let data = await OrderModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "not able to get the orders data" });
  }
});

module.exports = { orders };
