// controllers/dashboardController.js
const Product = require('../models/Product');
const Bid = require('../models/Bid');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;  // The logged-in user's ID

    // Count how many products this user has listed
    const productsListed = await Product.countDocuments({ seller: userId });

    // Count how many bids this user has placed
    const activeBids = await Bid.countDocuments({ user: userId });

    // If you track sales (e.g., if products have a "sold" flag or an order collection), calculate totalSales
    const totalSales = 0; // Update this logic if you have a mechanism to track sales

    // Fetch the 5 most recent bids placed by this user
    const recentBids = await Bid.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      activeBids,
      productsListed,
      totalSales,
      recentBids,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
