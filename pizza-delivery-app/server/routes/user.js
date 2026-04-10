const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPizzaOptions, createOrder, getUserOrders } = require('../controllers/userController');

router.get('/options', auth, getPizzaOptions);
router.post('/order', auth, createOrder);
router.get('/orders', auth, getUserOrders);

module.exports = router;
