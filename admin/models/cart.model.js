var express = require('express');
var mongoose = require('mongoose');

//tao bang du lieu
var addCartSchema = new mongoose.Schema({
    UserId : String,
    SanphamId : String,
    TotalPrice : Number, 
    DateCreate : Date,
    State : String,
    Name : String,
    Img : String,
    Title : String, 
    Category : String,
    Nation : String,
    Price : Number,
    Quantity : Number
})

// tao collection
var addcartDb = mongoose.model('addcartDb', addCartSchema, 'cart');

module.exports = addcartDb; 