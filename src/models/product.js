const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    vendor: String,
    img: String,
    description: String,
  });

module.exports = Product = mongoose.model("Product", productSchema);