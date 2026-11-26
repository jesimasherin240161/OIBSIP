// PizzaHub Backend - OIBSIP Level 3
// Node.js + Express + JWT + Razorpay (Test) + Nodemailer + node-cron
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Razorpay = require('razorpay');
const app = express();
app.use(cors()); app.use(express.json());
const JWT_SECRET = 'pizzahub-secret-key';
const PORT = process.env.PORT || 5000;

// In-memory DB (Replace with MongoDB in production - mongoose.connect(process.env.MONGO_URI))
let users = [
  { id: 1, name: 'Demo User', email: 'user@pizza.com', password: 'user123', role: 'user', verified: true },
  { id: 2, name: 'Admin', email: 'admin@pizza.com', password: 'admin123', role: 'admin', verified: true }
];
let inventory = {
  bases: [{ name: 'Thin Crust', stock: 25 }, { name: 'Thick Crust', stock: 22 }, { name: 'Cheese Burst', stock: 18 }, { name: 'Whole Wheat', stock: 30 }, { name: 'Gluten Free', stock: 15 }],
  sauces: [{ name: 'Tomato Basil', stock: 40 }, { name: 'BBQ', stock: 28 }, { name: 'Pesto', stock: 20 }, { name: 'Alfredo', stock: 24 }, { name: 'Peri Peri', stock: 19 }],
  cheeses: [{ name: 'Mozzarella', stock: 35 }, { name: 'Cheddar', stock: 22 }, { name: 'Parmesan', stock: 16 }],
  veggies: [{ name: 'Onion', stock: 50 }, { name: 'Mushroom', stock: 28 }, { name: 'Paneer', stock: 21 }, { name: 'Jalapeno', stock: 17 }]
};
let orders = []; let orderId = 1001;
const LOW_THRESHOLD = 20;

// Razorpay Test Mode
const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_123', key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret' });

// Nodemailer - Email Verification / Reset / Stock Alert
const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
async function sendEmail(to, subject, text) {
  console.log(`[EMAIL to ${to}] ${subject}: ${text}`);
  try { await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text }); } catch (e) { console.log('Email simulated (no credentials):', text); }
}

// node-cron - Check stock every minute, alert if < 20
cron.schedule('* * * * *', () => {
  const all = [...inventory.bases, ...inventory.sauces, ...inventory.cheeses, ...inventory.veggies];
  const low = all.filter(i => i.stock < LOW_THRESHOLD);
  if (low.length) sendEmail('admin@pizza.com', 'Low Stock Alert', `Low stock: ${low.map(i => i.name + ' (' + i.stock + ')').join(', ')}`);
  console.log('Cron job: Stock checked at', new Date().toLocaleTimeString());
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); } catch { return res.status(401).json({ msg: 'Invalid token' }); }
};
const adminOnly = (req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin only' }); next(); };

app.get('/', (req, res) => res.json({ message: 'PizzaHub API Live ✅' }));
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: 'User exists' });
  const user = { id: users.length + 1, name, email, password, role: 'user', verified: false };
  users.push(user);
  await sendEmail(email, 'Verify your PizzaHub account', `Click to verify: http://localhost:5000/api/auth/verify/${user.id}`);
  res.json({ msg: 'Registered! Verification email sent.' });
});
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
});
app.post('/api/auth/forgot-password', async (req, res) => {
  await sendEmail(req.body.email, 'Reset Password', 'Reset link: http://localhost:3000/reset?token=abc123');
  res.json({ msg: 'Reset link sent to email' });
});
app.get('/api/inventory', auth, adminOnly, (req, res) => res.json(inventory));
app.put('/api/inventory/:category/:index', auth, adminOnly, (req, res) => {
  inventory[req.params.category][req.params.index].stock = req.body.stock;
  res.json({ msg: 'Stock updated' });
});
app.post('/api/orders/create-razorpay', auth, async (req, res) => {
  const order = await razorpay.orders.create({ amount: req.body.amount * 100, currency: 'INR', receipt: 'order_' + Date.now() });
  res.json(order);
});
app.post('/api/orders', auth, (req, res) => {
  const order = { id: orderId++, userId: req.user.id, ...req.body, status: 'Order Received', createdAt: new Date() };
  orders.push(order);
  // Auto decrement stock
  inventory.bases[0].stock--; inventory.sauces[0].stock--; inventory.cheeses[0].stock--;
  res.json(order);
});
app.get('/api/orders/my', auth, (req, res) => res.json(orders.filter(o => o.userId === req.user.id)));
app.get('/api/orders/all', auth, adminOnly, (req, res) => res.json(orders));
app.put('/api/orders/:id/status', auth, adminOnly, (req, res) => {
  const o = orders.find(x => x.id == req.params.id); if (o) o.status = req.body.status;
  res.json(o); // Frontend polls this - real-time via polling
});
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));