const express = require('express')
const router = express.Router()

// Including shippment model
const { shippment } = require('../models/models');

// Including shippment validation
const { shippmentValidation } = require('../validation/validation');

/**
 * @route POST /api/shippments/
 * @desc Adding Shippment
 * @access Private
 * @errors {
 *  Code: 3 - Error with validation,
 * }
 */
router.post('/', async (req, res) => {
    const { error } = shippmentValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0].message, code: 3 });
    }
    else {
        let shippment = new Shippment(req.body);
        shippment = await shippment.save();
        res.status(200).json({ Shippment, msg: 'Shippment successfully registered.' });
    }
})

/**
 * @route GET /api/shippments/:id
 * @desc Showing shippment info
 * @access Public
 * @errors {
 *  Code: 1 - Error with database,
 * }
 */
router.get('/:id', async (req, res) => {
    Shippment.findById(req.params.id, (err, shippment) => {
        if (err) {
            res.status(404).json({ error: err, code: 1 });
        }
        else {
            res.status(200).json(shippment);
        }
    });
})

/**
 * @route GET /api/shippments
 * @desc Showing all shippments
 * @access Public
 * @errors {
 *  Code: 1 - Error with database,
 * }
 */
router.get('/', async (req, res) => {
    Shippment.find((err, shippments) => {
        if (err) {
            res.status(404).json({ error: err, code: 1 });
        }
        else {
            res.status(200).json(shippments);
        }
    });
})

/**
 * @route PUT /api/shippments/:id
 * @desc Updating shippment info
 * @access Private
 * @errors {
 *  Code: 1 - Error with database,
 *  Code: 3 - Error with validation,
 * }
 */
router.put('/:id', (req, res) => {
    const { error } = shippmentValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0], code: 3 });
    }
    else {
        Shippment.findByIdAndUpdate(req.params.id, { $set: { senderAddress: req.body.senderAddress, deliveryAddress: req.body.deliveryAddress, deliveredAt: req.body.deliveredAt } }, (err, shippment) => {
            if (err) {
                res.status(404).json({ error: 'Shippment not found.', code: 1 });
            }
            else {
                res.status(200).json({ shippment, msg: 'Shippment successfully updated.' });
            }
        })
    }
})

/**
 * @route DELETE /api/shippments/:id
 * @desc Deleting shippment from Database
 * @access Private
 * @errors {
 *  Code: 1 - Error with database,
 * }
 */
router.delete('/:id', (req, res) => {
    Shippment.findByIdAndDelete(req.params.id, (err, shippment) => {
        if (err) {
            res.status(404).json({ error: 'Shippment not found.', code: 1 });
        }
        else {
            res.status(200).json({ shippment, msg: 'Shippment successfully deleted.' });
        }
    })
})

module.exports = router;