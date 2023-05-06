const mongoose = require("mongoose");

const book = mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  { versionKey: false }
);

const BookModel = mongoose.model("book", book);
module.exports = { BookModel };
