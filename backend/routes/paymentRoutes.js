const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/checkout', protect, createCheckoutSession);

module.exports = router;

