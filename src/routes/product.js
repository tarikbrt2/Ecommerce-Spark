const express = require('express')
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
        res.status(404).json({ error: error.details[0].message });
    }
    let product = new Product(req.body);
    product = await product.save();
    res.status(200).json({ product, msg: 'Product successfully registered.' });
})

/**
 * @route GET /api/products/:id
 * @desc Showing product info
 * @access Public
 */
router.get('/:id', async (req, res) => {
    Product.findById(req.params.id, (err, Product) => {
        if (err) {
            res.status(404).json({ error: err });
        }
        else {
            res.status(404).json(Product);
        }
    });
})

/**
 * @route PUT /api/products/:id
 * @desc Updating product info
 * @access Private
 */
router.put('/:id', (req, res) => {
    const { error } = productValidation(req.body);
    if (error) {
        res.status(404).json({ error: error.details[0] });
    }
    else {
        Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
            if (err) {
                res.status(404).json({ error: 'Product not found.' });
            }
            else {
                res.status(200).json({ product, msg: 'Product successfully updated.' });
            }
        })
    }
})

/**
 * @route DELETE /api/products/:id
 * @desc Deleting product from Database
 * @access Private
 */
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            res.status(404).json({ error: 'Product not found.' });
        }
        else {
            res.status(200).json({ product, msg: 'Product successfully deleted.' });
        }
    })
})

module.exports = router;