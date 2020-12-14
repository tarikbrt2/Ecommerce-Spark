/**
* @desc Customer model
* @schema { name, email, phone, birthDate }
*/
const Customer = require('./customer');

/**
* @desc Shippment model
* @schema { senderAddress, deliveryAddress, createdAt, deliveredAt }
*/
const Shippment = require('./shippment');

/**
* @desc Product model
* @schema { name, quantity, vendor }
*/
const Product = require('./product');

/**
* @desc Order model
* @schema { createdAt, cost, deliveryAddress}
*/
const Order = require('./order');

module.exports = {
    Customer,
    Shippment,
    Product,
    Order
}