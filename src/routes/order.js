const express = require('express')
const { VALIDATION_ERROR, DATABSE_ERROR } = require('../responses/errors');

const router = express.Router()

// Including order model
const { Order } = require('../models/models');

// Including order validation
const { orderValidation } = require('../validation/validation');

/**
 * @route POST /api/orders/
 * @desc Adding order
 * @access Public
 */
router.post('/', async (req, res) => {
    const { error } = orderValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message, code: VALIDATION_ERROR.code });
    }
    else {
        let order = new Order(req.body);
        order = await order.save();
        const payload = {
            createdAt: order.createdAt,
            cost: order.cost,
            deliveryAddres: order.deliveryAddres,
        }
        res.status(200).json({ order: payload, msg: 'Order successfully registered.' });
    }
})

/**
 * @route GET /api/orders
 * @desc Showing all orders
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); 
        res.status(200).json(orders);
    }
    catch(err) {
        res.status(400).json(DATABSE_ERROR);
    }
});

/**
 * @route GET /api/orders/:id
 * @desc Showing order info
 * @access Public
 */
router.get('/:id', async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);
        const payload = {
            createdAt: order.createdAt,
            cost: order.cost,
            deliveryAddres: order.deliveryAddres,
        }
        res.status(200).json(payload);
    } catch (err) {
        res.status(400).json(DATABSE_ERROR);
    }
})

/**
 * @route PUT /api/orders/:id
 * @desc Updating order info
 * @access Private
 */
router.put('/:id', async (req, res) => {
    const { error } = orderValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0], code: VALIDATION_ERROR.code });
    }
    else {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, { $set : { cost: req.body.cost, deliveryAddress: req.body.deliveryAddress } });
            const payload = {
                createdAt: order.createdAt,
                cost: order.cost,
                deliveryAddres: order.deliveryAddres,
            }
            res.status(200).json({ order: payload, msg: 'Order successfully updated.' });
        } catch (err) {
            res.status(400).json(DATABSE_ERROR);
        }
    }
})

/**
 * @route DELETE /api/orders/:id
 * @desc Deleting order from Database
 * @access Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        const payload = {
            createdAt: order.createdAt,
            cost: order.cost,
            deliveryAddres: order.deliveryAddres,
        }
        res.status(200).json({ order: payload, msg: 'Order successfully deleted.' });
    } catch (err) {
        res.status(400).json(DATABSE_ERROR);
    }
})

module.exports = router;