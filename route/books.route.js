const express = require("express");
const { UserModel } = require("../model/auth.model");
const books = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");


books.get("/", async (req, res) => {
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

books.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let data = await BookModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "error in fetching the data of books" });
  }
});

books.post("/", async (req, res) => {
  try {
    let data = req.body;
    let item = await BookModel(data);
    await item.save();
    res.status(201).send({ msg: "books data is posted" });
  } catch (error) {
    res.status(400).send({ msg: "books data is not posted" });
  }
});

books.patch("/:id", async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let item = await BookModel.findByIdAndUpdate(id, data);
    res.status(204).send({ msg: "books data has been updated" });
  } catch (error) {
    res.status(400).send({ msg: "error in books updating the data" });
  }
});

books.put("/:id", async (req, res) => {
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
    res.status(204).send({ 'msg': "books data has been updated with put" });
  } catch (error) {
    res
      .status(400)
      .send({ 'msg': "error in books updating the data of books with put" });
  }
});

books.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let item = await BookModel.findByIdAndDelete(id);
    res.status(202).send({ msg: "books data has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: "books data has been not deleted" });
  }
});


module.exports = { books };
