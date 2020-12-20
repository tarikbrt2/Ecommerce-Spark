const express = require('express')
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
        res.status(404).json({ error: error.details[0].message, code: 3 });
    }
    else {
        let order = new Order(req.body);
        order = await order.save();
        res.status(200).json({ order, msg: 'Order successfully registered.' });
    }
})

/**
 * @route GET /api/orders
 * @desc Showing all orders
 * @access Public
 */
router.get('/', async (req, res) => {
    Order.find((err, orders) => {
        if (err) {
            res.status(404).json({ error: err, code: 1 });
        }
        else {
            res.status(200).json(orders);
        }
    });
})

/**
 * @route GET /api/orders/:id
 * @desc Showing order info
 * @access Public
 */
router.get('/:id', async (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) {
            res.status(404).json({ error: err, code: 1 });
        }
        else {
            res.status(404).json(order);
        }
    });
})

/**
 * @route PUT /api/orders/:id
 * @desc Updating order info
 * @access Private
 */
router.put('/:id', (req, res) => {
    const { error } = orderValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0], code: 3 });
    }
    else {
        Order.findByIdAndUpdate(req.params.id, { $set : { cost: req.body.cost, deliveryAddress: req.body.deliveryAddress } }, (err, order) => {
            if (err) {
                res.status(404).json({ error: 'Order not found.', code: 1 });
            }
            else {
                res.status(200).json({ order, msg: 'Order successfully updated.' });
            }
        })
    }
})

/**
 * @route DELETE /api/orders/:id
 * @desc Deleting order from Database
 * @access Public
 */
router.delete('/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id, (err, order) => {
        if (err) {
            res.status(404).json({ error: 'Order not found.', code: 1 });
        }
        else {
            res.status(200).json({ order, msg: 'Order successfully deleted.' });
        }
    })
})

module.exports = router;