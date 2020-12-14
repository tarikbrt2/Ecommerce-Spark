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
 */
router.post('/', async (req, res) => {
    const { error } = shippmentValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0].message });
    }
    let shippment = new Shippment(req.body);
    shippment = await shippment.save();
    res.status(200).json({ Shippment, msg: 'Shippment successfully registered.' });
})

/**
 * @route GET /api/shippments/:id
 * @desc Showing shippment info
 * @access Public
 */
router.get('/:id', async (req, res) => {
    Shippment.findById(req.params.id, (err, shippment) => {
        if (err) {
            res.status(404).json({ error: err });
        }
        else {
            res.status(404).json(shippment);
        }
    });
})

/**
 * @route PUT /api/shippments/:id
 * @desc Updating shippment info
 * @access Private
 */
router.put('/:id', (req, res) => {
    const { error } = shippmentValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0] });
    }
    else {
        Shippment.findByIdAndUpdate(req.params.id, { $set: { senderAddress: req.body.senderAddress, deliveryAddress: req.body.deliveryAddress, deliveredAt: req.body.deliveredAt } }, (err, shippment) => {
            if (err) {
                res.status(404).json({ error: 'Shippment not found.' });
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
 */
router.delete('/:id', (req, res) => {
    Shippment.findByIdAndDelete(req.params.id, (err, shippment) => {
        if (err) {
            res.status(404).json({ error: 'Shippment not found.' });
        }
        else {
            res.status(200).json({ shippment, msg: 'Shippment successfully deleted.' });
        }
    })
})

module.exports = router;