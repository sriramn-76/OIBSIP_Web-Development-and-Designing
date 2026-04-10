const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaItemSchema = new Schema({
  base: String,
  sauce: String,
  cheese: String,
  veggies: [String],
  meat: [String],
});

const deliverySchema = new Schema({
  address: String,
  phone: String,
  instructions: String
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pizza: pizzaItemSchema,
  amount: Number,
  paymentMethod: { type: String, enum: ['cash', 'gpay', 'card'], default: 'cash' },
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  status: { type: String, enum: ['received','kitchen','delivered'], default: 'received' },
  delivery: deliverySchema,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
