const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const productRoutes = require('./products');

router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);

module.exports = router;
