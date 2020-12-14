const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    vendor: String
  });

module.exports = Product = mongoose.model("Product", productSchema);