const express = require('express');
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const { sendOrderConfirmationEmail, sendAdminNewOrderAlert } = require('../utils/email');
const User = require('../models/User');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = await Order.create({ user: req.user.id, items, totalAmount });

  const user = await User.findById(req.user.id);
  await sendOrderConfirmationEmail(order, user);
  await sendAdminNewOrderAlert(order, user.name);

  res.status(201).json(order);
});

router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
  res.json(orders);
});

module.exports = router;
