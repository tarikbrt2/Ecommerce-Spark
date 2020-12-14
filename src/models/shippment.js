const mongoose = require('mongoose');

const shippmentSchema = new mongoose.Schema({
    senderAddress: String,
    deliveryAddress: String,
    createdAt: Date,
    deliveredAt: Date,
  });

module.exports = Shippment = mongoose.model("Shippment", shippmentSchema);