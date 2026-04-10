const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const sendEmail = require('../utils/mailer');

exports.getInventory = async (req, res) => {
  try {
    let inv = await Inventory.findOne();
    if (!inv) {
      inv = new Inventory();
      await inv.save();
    }
    res.json(inv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inv = await Inventory.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(inv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// helper to decrement inventory and send email if below threshold
exports.decrementInventory = async (pizza) => {
  const inv = await Inventory.findOne();
  if (!inv) return;
  const { base, sauce, cheese, veggies = [], meat = [] } = pizza;
  inv.base -= 1;
  inv.sauce -= 1;
  inv.cheese -= 1;
  inv.veggies -= veggies.length;
  inv.meat -= meat.length;
  await inv.save();
  if (inv.base < inv.threshold || inv.sauce < inv.threshold || inv.cheese < inv.threshold || inv.veggies < inv.threshold || inv.meat < inv.threshold) {
    await sendEmail(process.env.ADMIN_EMAIL, 'Inventory Alert', 'One of the stock items has gone below threshold');
  }
};
