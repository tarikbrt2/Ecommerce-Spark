const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now() },
    cost: Number,
    deliveryAddress: String
  });

module.exports = Order = mongoose.model("Order", orderSchema);