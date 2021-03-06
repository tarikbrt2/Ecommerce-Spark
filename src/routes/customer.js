const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { VALIDATION_ERROR, DATABASE_ERROR, EXISTING_USER, NOT_EXISTING_CUSTOMER, INVALID_CREDENTIALS } = require('../responses/errors');
const { isAdmin } = require('../functions/verfiy');

const router = express.Router();

// Including customer model
const { Customer } = require('../models/models');

// Including customer validation
const { customerValidation } = require('../validation/validation');

/**
 * @route POST /api/customers/
 * @desc Registering customer
 * @access Public
 */
router.post('/', (req, res) => {
    const { error } = customerValidation(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message, code: VALIDATION_ERROR.code });
    }
    else {
        Customer.findOne({ email: req.body.email }).then(async (customer) => {
            if (customer) {
                res.status(400).json(EXISTING_USER);
            } else {
                let customer = {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    phone: req.body.phone,
                    birthDay: req.body.birthDay
                }
                customer = new Customer(customer);
                customer = await customer.save();
                const payload = {
                    name: customer.name,
                    email: customer.email,
                    password: customer.password,
                    phone: customer.phone,
                    birthDay: customer.birthDay,
                };
                res.status(200).json({ customer: payload, msg: 'Customer successfully registered.' });
            }
        })
    }
})

/**
 * @route POST /api/customers/login
 * @desc Loging customer
 * @access Public
 */
router.post('/login', async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.body.email });
        const valid = await bcrypt.compare(req.body.password, customer.password); 
        if (valid) {
            const payload = {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                birthDay: customer.birthDay,
                role: customer.role
            }
            jwt.sign(payload, process.env.SECRET, (err, token) => {
                res.status(200).json({ token: `Bearer ${token}`, msg: 'Sucessfully logged in.' });
            });
        } else {
            res.status(401).json(INVALID_CREDENTIALS);
        }
    }
    catch(err) {
        res.status(404).json(NOT_EXISTING_CUSTOMER);
    }
})

/**
 * @route GET /api/customers/profile
 * @desc Profile of customer
 * @access Public
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json(req.user);
})

/**
 * @route GET /api/customers/:id
 * @desc Showing customer info
 * @access Private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } 
    catch(err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

/**
 * @route GET /api/customers
 * @desc Showing all customers
 * @access Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers); 
    }
    catch(err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

/**
 * @route PUT /api/customers/:id
 * @desc Updating customer info
 * @access Private
 */
router.put('/:id', async (req, res) => {
    const { error } = customerValidation(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0], code: VALIDATION_ERROR.code });
    }
    else {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            birthDay: req.body.birthDay
        };
        try {
            await Customer.findByIdAndUpdate(req.params.id, payload);
            res.status(200).json({ customer: payload, msg: 'Customer successfully updated.' });
        }
        catch(err) {
            res.status(400).json({ message: err, code: DATABASE_ERROR.code });
        }
    }
})

/**
 * @route DELETE /api/customers/:id
 * @desc Deleting customer from Database
 * @access Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ customer, msg: 'Customer successfully deleted.' });
    }
    catch(err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

module.exports = router;