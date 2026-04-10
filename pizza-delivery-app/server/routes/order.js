const express = require('express');
const router = express.Router();
const { verifyPayment } = require('../controllers/orderController');

// Razorpay callback endpoint (POST from client)
router.post('/verify', verifyPayment);

module.exports = router;
