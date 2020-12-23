const express = require('express');
const { VALIDATION_ERROR, DATABSE_ERROR } = require('../responses/errors');

const router = express.Router();

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
        res.status(400).json({ error: error.details[0].message, code: VALIDATION_ERROR.code });
    }
    else {
        let shippment = new Shippment(req.body);
        shippment = await shippment.save();
        const payload = {
            senderAddress: req.body.senderAddress,
            deliveryAddres: req.body.deliveryAddres,
            createdAt: req.body.createdAt,
            deliveredAt: req.body.deliveredAt,
        };
        res.status(200).json({ shippment: payload, msg: 'Shippment successfully registered.' });
    }
})

/**
 * @route GET /api/shippments/:id
 * @desc Showing shippment info
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        await Shippment.findById(req.params.id);
        const payload = {
            senderAddress: shippment.senderAddress,
            deliveryAddres: shippment.deliveryAddres,
            createdAt: shippment.createdAt,
            deliveredAt: shippment.deliveredAt,
        };
        res.status(200).json(payload);
    } catch (err) {
        res.status(400).json(DATABSE_ERROR);
    }
})

/**
 * @route GET /api/shippments
 * @desc Showing all shippments
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const shippments = await Shippment.find();
        res.status(200).json(shippments);
    } catch (err) {
        res.status(400).json(DATABSE_ERROR);
    }
})

/**
 * @route PUT /api/shippments/:id
 * @desc Updating shippment info
 * @access Private
 */
router.put('/:id', async (req, res) => {
    const { error } = shippmentValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0], code: VALIDATION_ERROR.code });
    }
    else {
        try {
            const shippment = await Shippment.findByIdAndUpdate(req.params.id);
            const payload = {
                senderAddress: shippment.senderAddress,
                deliveryAddres: shippment.deliveryAddres,
                createdAt: shippment.createdAt,
                deliveredAt: shippment.deliveredAt,
            };
            res.status(200).json({ shippment:payload, msg: 'Shippment successfully updated.' });
        } catch (err) {
            res.status(400).json(DATABSE_ERROR);
        }
    }
})

/**
 * @route DELETE /api/shippments/:id
 * @desc Deleting shippment from Database
 * @access Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const shippment = await Shippment.findByIdAndDelete(req.params.id);
        const payload = {
            senderAddress: shippment.senderAddress,
            deliveryAddres: shippment.deliveryAddres,
            createdAt: shippment.createdAt,
            deliveredAt: shippment.deliveredAt,
        };
        res.status(200).json({ shippment: payload, msg: 'Shippment successfully deleted.' });
    } catch (err) {
        res.status(400).json(DATABSE_ERROR);
    }
})

module.exports = router;