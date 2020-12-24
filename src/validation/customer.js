const Joi = require('joi');

const customerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).message('Min. number of characters for name is 3').max(30).message('Max. number of characters for name is 30').required(),
        password: Joi.string().min(6).message('Min. number of characters for password is 6.').max(64).message('Max. number of characters for password is 32.').required(),
        email: Joi.string().email().message('Invalid e-mail address').required(),
        phone: Joi.string().min(9).message('Invalid phone number.').max(11).message('Invalid phone number.').pattern(/^[0-9]+$/).message('Invalid phone number.').required(),
        birthDay: Joi.string().pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/).message('Invalid date format').required(),
        role: Joi.number().min(0).max(0).default(0),
    });
    return schema.validate(data);
}

module.exports = customerValidation;