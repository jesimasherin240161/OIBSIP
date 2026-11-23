const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false }
}));

const Pizza = mongoose.model('Pizza', new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  desc: String,
  category: String
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  user: String,
  items: Array,
  total: Number,
  address: String,
  phone: String,
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
}));

// AUTH
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.json({ msg: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.json({ msg: 'Registered! Please login' });
  } catch (e) { res.json({ msg: 'Error' }); }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: 'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.json({ msg: 'Wrong password' });
  const token = jwt.sign({ id: user._id }, 'secret123');
  res.json({ token, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

// PIZZAS
app.get('/api/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

app.post('/api/pizzas', async (req, res) => {
  const p = new Pizza(req.body);
  await p.save();
  res.json(p);
});

// SEED PIZZAS - call once
app.get('/api/seed', async (req, res) => {
  await Pizza.deleteMany({});
  await Pizza.insertMany([
    { name: 'Margherita', price: 199, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500', desc: 'Classic cheese & tomato', category: 'Veg' },
    { name: 'Paneer Tikka', price: 299, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', desc: 'Spicy paneer, capsicum, onion', category: 'Veg' },
    { name: 'Chicken BBQ', price: 349, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', desc: 'BBQ chicken, cheese, onion', category: 'Non-Veg' },
    { name: 'Veggie Supreme', price: 279, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500', desc: 'Loaded veggies & cheese', category: 'Veg' },
    { name: 'Chicken Tikka', price: 329, image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500', desc: 'Chicken tikka & spicy sauce', category: 'Non-Veg' },
    { name: 'Cheese Burst', price: 399, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500', desc: 'Extra cheese burst pizza', category: 'Veg' }
  ]);
  res.json({ msg: 'Seeded' });
});

// ORDERS
app.post('/api/orders', async (req, res) => {
  const o = new Order(req.body);
  await o.save();
  res.json(o);
});

app.get('/api/orders/:email', async (req, res) => {
  const orders = await Order.find({ user: req.params.email }).sort({ date: -1 });
  res.json(orders);
});

app.listen(5000, () => console.log('Server running on 5000'));