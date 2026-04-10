const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');

connectDB().then(async () => {
  const email = 'admin@pizza.com';
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name: 'Admin', email, password: await bcrypt.hash('password', 10), role: 'admin', emailVerified: true });
    await user.save();
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }
  process.exit(0);
});
