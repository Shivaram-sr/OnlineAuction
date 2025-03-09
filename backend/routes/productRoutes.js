// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getMyProducts, getProductById } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllProducts);
router.post('/', protect, createProduct);
router.get('/mine', protect, getMyProducts);
router.get('/:id', getProductById);

module.exports = router;

