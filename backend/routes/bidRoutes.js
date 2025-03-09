// bidRoutes.js
const express = require('express');
const router = express.Router();
const { placeBid, getBidsForProduct } = require('../controllers/bidController');
const { protect } = require('../middlewares/authMiddleware');

// Route to place a bid (POST /api/bids/:id)
router.post('/:id', protect, placeBid);

// Route to get all bids for a product (GET /api/bids/:id)
router.get('/mine', protect, getMyBids);

module.exports = router;


