const express = require("express");
const { auth, register } = require("./route/register.route");
const { connection } = require("./db");
const { login } = require("./route/login.route");
const { books } = require("./route/books.route");
const { order } = require("./route/order.route");
const { orders } = require("./route/orders.route");
const app = express();

app.use(express.json());

app.use("/api/register", register);

app.use("/api/login", login);

app.use("/api/books", books);

app.use("/api/order", order);

app.use("/api/orders", orders);

app.listen(4500, async (req, res) => {
  try {
    await connection;
    console.log("server is running");
  } catch (error) {
    console.log("server is not running");
  }
});
