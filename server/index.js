require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const pizzaRoutes = require('./routes/pizza');
const orderRoutes = require('./routes/order');

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ msg: 'PizzaHub API running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pizza', pizzaRoutes);
app.use('/api/order', orderRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Server error' });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});