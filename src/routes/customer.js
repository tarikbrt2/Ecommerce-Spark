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
    if (error) {
        res.status(404).json({ error: error.details[0].message });
    }
    let customer = new Customer(req.body);
    customer = await customer.save();
    return res.status(200).json({ customer, msg: 'Customer successfully registered.' });
})

/**
 * @route GET /api/customers/
 * @desc Showing customer info
 * @access Private
 */
router.get('/:id', async (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            res.status(404).json({ error: err });
        }
        else {
            res.status(404).json(customer);
        }
    });
})

/**
 * @route PUT /api/customers/:id
 * @desc Showing customer info
 * @access Private
 */
router.put('/:id', (req, res) => {
    const { error } = customerValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0] });
    }
    else {
        Customer.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
            if (err) {
                res.status(404).json({ error: 'Customer not found.' });
            }
            else {
                res.status(200).json({ customer, msg: 'Customer successfully updated.' });
            }
        })
    }
})

/**
 * @route DELETE /api/customers/:id
 * @desc Deleting customer from Database
 * @access Private
 */
router.delete('/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id, (err, customer) => {
        if (err) {
            res.status(404).json({ error: 'User not found.' });
        }
        else {
            res.status(200).json({ customer, msg: 'User successfully deleted.' });
        }
    })
})

module.exports = router;