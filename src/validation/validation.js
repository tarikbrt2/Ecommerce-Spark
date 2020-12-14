/**
* @desc Customer validation
* @schema { name, email, phone, birthDate }
*/
const customerValidation = require('./customer');

/**
* @desc Product validation
* @schema { name, quantity, vendor }
*/
const productValidation = require('./product');

/**
* @desc Order validation
* @schema { createdAt, const, deliveryAddress }
*/
const orderValidation = require('./order');

/**
* @desc Shippment validation
* @schema { senderAddress, deliveryAddress, createdAt, deliveredAt }
*/
const shippmentValidation = require('./shippment');

module.exports = {
    customerValidation,
    productValidation,
    orderValidation,
    shippmentValidation
}