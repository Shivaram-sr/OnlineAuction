// bidController.js
const Bid = require('../models/Bid');
const Product = require('../models/Product');

// In controllers/bidController.js
exports.placeBid = async (req, res) => {
  try {
    const { id } = req.params; // Product ID
    const { bidAmount } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (bidAmount <= product.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    if (product.seller.toString() === userId.toString()) {
      return res.status(400).json({ message: 'Cannot bid on your own product' });
    }

    const bid = await Bid.create({
      productId: id,
      user: req.user._id,
      bidAmount,
    });

    product.currentBid = bidAmount;
    await product.save();

    // Emit a dashboard update event
    const io = req.app.get('io');
    io.emit('dashboardUpdate', {
      productId: id,
      newBid: bidAmount,
      // Optionally, include updated stats like active bids count, etc.
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get all bids for a product
exports.getBidsForProduct = async (req, res) => {
  try {
    const { id } = req.params; // product ID
    const bids = await Bid.find({ productId: id }).populate('user', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getMyBids = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all bids where user = userId
    // Populate the productId to get product details (title, currentBid, etc.)
    const bids = await Bid.find({ user: userId })
      .populate('productId', 'title currentBid startingPrice') // fields you want
      .sort({ createdAt: -1 }); // optional: sort newest first

    res.json(bids);
  } catch (error) {
    console.error('Error fetching user bids:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

