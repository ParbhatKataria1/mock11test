const express = require("express");
const { UserModel } = require("../model/auth.model");
const order = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { BookModel } = require("../model/book.model");
const { OrderModel } = require("../model/order.model");



order.post('/', async(req,res)=>{
    try {
        let data = req.body;
        let item = new OrderModel(data);
        await item.save();
        res.status(201).send({'msg':"order is created"});
    } catch (error) {
        res.status(400).send({'msg':"order is not created"});   
    }
})

order.get('/', async(req,res)=>{
    try {
        let data = await OrderModel.find();
        res.status(200).send(data);
        
    } catch (error) {
        res.status(400).send({'msg':'not able to get the orders data'})
    }
})

module.exports = { order };
