const mongoose = require("mongoose");

const order = mongoose.Schema(
  {
    user: { type: String, ref: "User" },
    books: [{ type: String, ref: "Book" }],
    totalAmount: Number,
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("order", order);
module.exports = { OrderModel };
