const Order = require('../models/Order');
const adminCtrl = require('./adminController');
const crypto = require('crypto');

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  try {
    // validate signature
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ msg: 'Invalid signature' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    order.paymentStatus = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();
    // decrease inventory and maybe send notification
    adminCtrl.decrementInventory(order.pizza);
    res.json({ msg: 'Payment verified', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};