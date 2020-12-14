const express = require('express')
const router = express.Router()

// Including customer model
const { Customer } = require('../models/models');

// Including customer validation
const { customerValidation } = require('../validation/validation');

/**
 * @route POST /api/customers/
 * @desc Registering customer
 * @access Public
 */
router.post('/', async (req, res) => {
    const { error } = customerValidation(req.body);
    if(error){
        res.status(404).json({ error: error.details[0].message });
    }
    else {
        let customer = new Customer(req.body);
        customer = await customer.save();
        res.status(201).json({ msg: 'Customer successfully registered.'});
    }
})

/**
 * @route GET /api/customers/
 * @desc Showing customer info
 * @access Private
 */
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if(err){
            res.status(404).json({ error: 'User not found.'});
        }
        else{
            res.status(200).json(customer);
        }
    })
})

module.exports = router;