const Joi = require('joi');

const shippmentValidation = (data) => {
    const schema = Joi.object({
        senderAddress: Joi.string().min(6).message('Min. number of characters for address is 6').max(30).message('Max. number of characters for address is 30').required(),
        deliveryAddress: Joi.string().min(6).message('Min. number of characters for address is 6').max(30).message('Max. number of characters for address is 30').required(),
        createdAt: Joi.date().format('string').message('Invalid date format.').required(),
        deliveredAt: Joi.date().format('string').message('Invalid date format.').required()
    });
    return schema.validate(data);
}

module.exports = shippmentValidation;