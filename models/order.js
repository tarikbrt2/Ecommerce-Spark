const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    createdAt: Date,
    cost: Number,
    deliveryAddress: String
  });

module.exports = Order = mongoose.model("Order", orderSchema);