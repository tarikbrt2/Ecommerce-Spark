const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    birthDate: Date
  });

  module.exports = Customer = mongoose.model("Customer", customerSchema);