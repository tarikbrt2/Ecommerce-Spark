const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// Including customer model
const { Customer } = require('../models/models');

// Including customer validation
const { customerValidation } = require('../validation/validation');

/**
 * @route POST /api/customers/
 * @desc Registering customer
 * @access Public
 * @errors { 
 * code: 2 - User with same e-mail address already exists,
 * code: 3 - Error with validation
 * }
 */
router.post('/', (req, res) => {
    const { error } = customerValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0].message, code: 3 });
    }
    else {
        Customer.findOne({ email: req.body.email }).then(async (customer) => {
            if (customer) {
                res.status(404).json({ error: 'User with same e-mail address already exists.', code: 2 });
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
                res.status(200).json({ customer, msg: 'Customer successfully registered.' });
            }
        })
    }
})

/**
 * @route POST /api/customers/login
 * @desc Loging customer
 * @access Public
 * @errors { 
 * code: 1 - Wrong password,
 * code: 2 - Already registered user with same e-mail
 * }
 */
router.post('/login', async (req, res) => {
    Customer.findOne({ email: req.body.email }).then(customer => {
        if (customer) {
            bcrypt.compare(req.body.password, customer.password).then(valid => {
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
                    res.status(404).json({ error: "Wrong password, please try again.", code: 1 });
                }
            })
        }
        else {
            res.status(404).json({ error: "Customer is not registered, please resgister.", code: 2 });
        }
    })
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
 * @errors { 
 * code: 1 - Error with database,
 * code: 2 - Forbbiden
 * }
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.role > 0) {
        Customer.findById(req.params.id, (err, customer) => {
            if (err) {
                res.status(404).json({ error: err, code: 1 });
            }
            else {
                res.status(200).json(customer);
            }
        });
    } else {
        res.status(403).json({ error: 'Forbidden', code: 2 });
    }
})

/**
 * @route GET /api/customers
 * @desc Showing all customers
 * @access Private
 * @errors { 
 * code: 1 - Error with database,
 * code: 2 - Forbidden
 * }
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.role > 0) {
        Customer.find((err, customers) => {
            if (err) {
                res.status(404).json({ error: err , code: 1});
            }
            else {
                res.status(200).json(customers);
            }
        });
    } else {
        res.status(403).json({ error: 'Forbidden', code: 2 });
    }
})

/**
 * @route PUT /api/customers/:id
 * @desc Updating customer info
 * @access Private
 * @errors { 
 * code: 1 - Error with database,
 * code: 3 - Error with validation
 * }
 */
router.put('/:id', (req, res) => {
    const { error } = customerValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0], code: 3 });
    }
    else {
        Customer.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
            if (err) {
                res.status(404).json({ error: err, code: 1 });
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
 * @errors { 
 * code: 1 - Error with database
 * }
 */
router.delete('/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id, (err, customer) => {
        if (err) {
            res.status(404).json({ error: 'Customer not found.', code: 1 });
        }
        else {
            res.status(200).json({ customer, msg: 'Customer successfully deleted.' });
        }
    })
})

module.exports = router;