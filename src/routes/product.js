const express = require('express');
const { VALIDATION_ERROR, DATABASE_ERROR, EMPTY_COLLECTION } = require('../responses/errors');

const router = express.Router()

// Including Product model
const { Product } = require('../models/models');

// Including Product validation
const { productValidation } = require('../validation/validation');

/**
 * @route POST /api/products/
 * @desc Adding product
 * @access Private
 */
router.post('/', async (req, res) => {
    const { error } = productValidation(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message, code: VALIDATION_ERROR.code });
    }
    else {
        let product = new Product(req.body);
        product = await product.save();
        const payload = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            img: req.body.img,
            vendor: req.body.vendor,
            description: req.body.description,
        };
        res.status(200).json({ product: payload, msg: 'Product successfully registered.' });
    }
})

/**
 * @route GET /api/products/
 * @desc Showing all products
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(400).json(EMPTY_COLLECTION);
        }
    } catch (err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

/**
 * @route GET /api/products/:id
 * @desc Showing product info
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const payload = {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            img: product.img,
            vendor: product.vendor,
            description: product.description,
        };
        res.status(200).json(payload);
    } catch (err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

/**
 * @route PUT /api/products/:id
 * @desc Updating product info
 * @access Private
 */
router.put('/:id', async (req, res) => {
    const { error } = productValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0], code: VALIDATION_ERROR.code });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        const payload = {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            img: product.img,
            vendor: product.vendor,
            description: product.description,
        };
        res.status(200).json({ product: payload, msg: 'Product successfully updated.' });
    } catch (err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

/**
 * @route DELETE /api/products/:id
 * @desc Deleting product from Database
 * @access Private
 */
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        const payload = {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            img: product.img,
            vendor: product.vendor,
            description: product.description,
        };
        res.status(200).json({ product: payload, msg: 'Product successfully deleted.' });
    } catch (err) {
        res.status(400).json({ message: err, code: DATABASE_ERROR.code });
    }
})

module.exports = router;