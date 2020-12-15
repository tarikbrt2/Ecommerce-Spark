const Joi = require('joi');

const productValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).message('Min. number of characters for product name is 6').max(30).message('Max. number of characters for product name is 30').required(),
        quantity: Joi.number().min(0).message('Product quantity cannot be less than 0.').required(),
        price: Joi.number().min(1).message('Price of the product cannot be less than $1.').required(),
        vendor: Joi.string().min(3).message('Min. number of characters for vendors name is 3').max(30).message('Max. number of characters for vendors name is 30').required(),
        img: Joi.string().required(),
    });
    return schema.validate(data);
}

module.exports = productValidation;