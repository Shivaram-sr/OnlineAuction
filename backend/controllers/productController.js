const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, startingPrice, endTime } = req.body;
    // Use req.user._id (set by protect middleware) as the seller ID
    const product = await Product.create({
      title,
      description,
      startingPrice,
      currentBid: startingPrice,  // initialize current bid with startingPrice
      endTime,
      seller: req.user._id
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Populate seller information (name and email)
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    console.log('request received by controller')
    console.log(req)
    const userId = req.user._id;
    console.log("userId:",userId)
    const myProducts = await Product.find({ seller: userId });
    res.json(myProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};