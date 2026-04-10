const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  base: { type: Number, default: 0 },
  sauce: { type: Number, default: 0 },
  cheese: { type: Number, default: 0 },
  veggies: { type: Number, default: 0 },
  meat: { type: Number, default: 0 },
  threshold: { type: Number, default: 20 },
});

module.exports = mongoose.model('Inventory', inventorySchema);
