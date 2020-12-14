const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    birthDay: String,
    role: { type: Number, default: 0 }
  });

  module.exports = Customer = mongoose.model("Customer", customerSchema);