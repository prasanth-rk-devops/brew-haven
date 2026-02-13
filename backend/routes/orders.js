const express = require('express');
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderConfirmationEmail, sendAdminNewOrderAlert } = require('../utils/email');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount
    });

    const user = await User.findById(req.user.id);
    await sendOrderConfirmationEmail(order, user);
    await sendAdminNewOrderAlert(order, user.name);

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;