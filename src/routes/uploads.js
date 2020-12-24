const express = require('express');
const multer = require('multer');
const path = require('path');
const { MULTER_ERROR } = require('../responses/errors');

const router = express.Router();

// Initializing storage
const storage = multer.diskStorage({
    destination: './images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
})

// Initializing upload
const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
}).single('img');

/**
 * @route POST /api/uploads/
 * @desc Uploading picture
 * @access Private
 */
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err, code: MULTER_ERROR.code });
        } else {
            console.log(req.file);
            res.status(200).json({ filename: req.file.filename, path: req.file.path });
        }
    });
})

module.exports = router;