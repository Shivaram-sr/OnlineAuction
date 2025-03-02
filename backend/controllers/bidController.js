// controllers/bidController.js
exports.placeBid = async (req, res) => {
  try {
    const { id } = req.params; // product ID
    const { bidAmount } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (bidAmount <= product.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    // Create the bid
    const bid = await Bid.create({
      productId: id,
      user: req.user._id,
      bidAmount
    });

    // Update the product's current bid
    product.currentBid = bidAmount;
    await product.save();

    // Emit the update event to all connected clients
    const io = req.app.get('io');
    io.emit('bidUpdate', { productId: id, newBid: bidAmount });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
