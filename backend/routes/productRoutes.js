const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
