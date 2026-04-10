const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getInventory, updateInventory, getAllOrders, updateOrderStatus } = require('../controllers/adminController');

// only admin middleware can be added
router.get('/inventory', auth, getInventory);
router.post('/inventory', auth, updateInventory);
router.get('/orders', auth, getAllOrders);
router.post('/order/:id/status', auth, updateOrderStatus);

module.exports = router;