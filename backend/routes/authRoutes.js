
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', protect, (req, res) => {
  // req.user should be set by your `protect` middleware
  res.json(req.user);
});

module.exports = router;
