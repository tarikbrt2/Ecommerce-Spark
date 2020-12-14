const Joi = require('joi');

const orderValidation = (data) => {
    const schema = Joi.object({
        createdAt: Joi.date().format('string').message('Invalid date format.').default(Date.now().toString()).required(),
        cost: Joi.number().min(0).message('Order price cannot be less than 0.').required(),
        deliveryAddress: Joi.string().min(6).message('Min. number of characters for address is 6').max(30).message('Max. number of characters for address is 30').required()
    });
    return schema.validate(data);
}

module.exports = orderValidation;