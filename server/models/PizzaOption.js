const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  category: { type: String, enum: ['base','sauce','cheese','veggies','meat'], required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('PizzaOption', optionSchema);
