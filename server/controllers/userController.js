const PizzaOption = require('../models/PizzaOption');
const Order = require('../models/Order');
const razorpay = require('../utils/razorpay');
const Inventory = require('../models/Inventory');

// list options endpoint
exports.getPizzaOptions = async (req, res) => {
  try {
    const options = await PizzaOption.find();
    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  const { pizza, amount, paymentMethod, delivery } = req.body;
  try {
    // Set payment status based on payment method
    let paymentStatus = 'pending';
    if (paymentMethod === 'cash' || paymentMethod === 'gpay') {
      paymentStatus = 'pending'; // Will be marked as paid on delivery/confirmation
    }

    if (paymentMethod === 'card') {
      // For card, create razorpay order
      const rOrder = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' });
      const order = new Order({ 
        user: req.user.id, 
        pizza, 
        amount, 
        paymentMethod,
        paymentStatus,
        delivery,
        razorpayOrderId: rOrder.id 
      });
      await order.save();
      res.json({ orderId: order._id, razorpay: rOrder });
    } else {
      // For cash/gpay, no razorpay needed
      const order = new Order({ 
        user: req.user.id, 
        pizza, 
        amount, 
        paymentMethod,
        paymentStatus,
        delivery
      });
      await order.save();
      // Mark as paid for cash/gpay immediately
      order.paymentStatus = 'paid';
      await order.save();
      res.json({ orderId: order._id, msg: 'Order placed successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
