let obj = {
  name: "parbhat",
  email: "parbhat@gmail.com",
  password: "parbhat",
  isAdmin: false,
};

let obj2 = {
  title: "the jack",
  author: "kralo",
  category: "money1",
};

const express = require("express");
const { UserModel } = require("../model/auth.model");
const auth = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");

auth.post("/register", async (req, res) => {
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

auth.post("/login", async (req, res) => {
  let { name, email, password, isAdmin } = req.body;
  let boo = await UserModel.find({ email });
  let { password: hash } = boo[0];
  console.log(hash, password, email);
  try {
    bcrypt.compare(password, hash, function (err, result) {
      // result == true
      if (err) {
        res.status(400).send({ msg: "the entered password, is wrong" });
      }
      res
        .status(201)
        .send({ msg: `Bearer ${jwt.sign({ foo: "bar" }, "masai")}` });
    });
  } catch (error) {}
});

auth.get("/books", async (req, res) => {
  let obj = req.query;
  console.log(obj);
  let temp = {};
  if (obj.category) {
    temp.category = obj.category;
  }
  if (obj.author) {
    temp.author = obj.author;
  }
  try {
    let data = await BookModel.find(temp);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "error in fetching the data of books" });
  }
});

auth.get("/books/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let data = await BookModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "error in fetching the data of books" });
  }
});

auth.post("/books", async (req, res) => {
  try {
    let data = req.body;
    let item = await BookModel(data);
    await item.save();
    res.status(201).send({ msg: "books data is posted" });
  } catch (error) {
    res.status(400).send({ msg: "books data is not posted" });
  }
});

auth.patch("/books/:id", async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let item = await BookModel.findByIdAndUpdate(id, data);
    res.status(204).send({ msg: "books data has been updated" });
  } catch (error) {
    res.status(400).send({ msg: "error in books updating the data" });
  }
});

auth.put("/books/:id", async (req, res) => {
  try {
    let obj = {
      title: "",
      author: "",
      category: "",
      price: 0,
      quantity: 0,
    };
    let data = req.body;
    let id = req.params.id;
    console.log({ ...obj, ...data }, id, data);
    let temp = await BookModel.findByIdAndUpdate(id, { ...obj, ...data });
    res.status(204).send({ msg: "books data has been updated with put" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "error in books updating the data of books with put" });
  }
});

auth.delete("/books/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let item = await BookModel.findByIdAndDelete(id);
    res.status(202).send({ msg: "books data has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: "books data has been not deleted" });
  }
});

auth.post("/order", async (req, res) => {
  try {
    let data = req.body;
    let item = new OrderModel(data);
    await item.save();
    res.status(201).send({ msg: "order is created" });
  } catch (error) {
    res.status(400).send({ msg: "order is not created" });
  }
});

auth.get("/orders", async (req, res) => {
  try {
    let data = await OrderModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "not able to get the orders data" });
  }
});

module.exports = { auth };
