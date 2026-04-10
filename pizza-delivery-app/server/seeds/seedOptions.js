const mongoose = require('mongoose');
require('dotenv').config();
const PizzaOption = require('../models/PizzaOption');
const connectDB = require('../config/db');

const options = [
  { category: 'base', name: 'Thin Crust' },
  { category: 'base', name: 'Thick Crust' },
  { category: 'base', name: 'Cheese Burst' },
  { category: 'base', name: 'Gluten Free' },
  { category: 'base', name: 'Pan Pizza' },
  { category: 'sauce', name: 'Tomato' },
  { category: 'sauce', name: 'Barbecue' },
  { category: 'sauce', name: 'Alfredo' },
  { category: 'sauce', name: 'Pesto' },
  { category: 'sauce', name: 'Spicy' },
  { category: 'cheese', name: 'Mozzarella' },
  { category: 'cheese', name: 'Cheddar' },
  { category: 'cheese', name: 'Parmesan' },
  { category: 'cheese', name: 'Provolone' },
  { category: 'cheese', name: 'Vegan' },
  { category: 'veggies', name: 'Onion' },
  { category: 'veggies', name: 'Bell Pepper' },
  { category: 'veggies', name: 'Mushroom' },
  { category: 'veggies', name: 'Olives' },
  { category: 'veggies', name: 'Spinach' },
  { category: 'meat', name: 'Pepperoni' },
  { category: 'meat', name: 'Sausage' },
  { category: 'meat', name: 'Chicken' },
  { category: 'meat', name: 'Bacon' },
  { category: 'meat', name: 'Ham' }
];

connectDB().then(async () => {
  await PizzaOption.deleteMany({});
  await PizzaOption.insertMany(options);
  console.log('Seeded pizza options');
  process.exit(0);
});
