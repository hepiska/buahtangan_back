const express = require('express');
const ProductController = require('../controllers/products');

const router = express.Router();

router.get('/products/:city_name/:category', ProductController.views);

module.exports = router;
