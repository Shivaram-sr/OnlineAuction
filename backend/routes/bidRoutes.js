const express = require('express');
const router = express.Router();
const { placeBid, getBidsForProduct } = require('../controllers/bidController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/:id', protect, placeBid);
// Optional route to get all bids for a product:
router.get('/:id', getBidsForProduct);

module.exports = router;

