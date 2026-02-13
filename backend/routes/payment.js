const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

router.post('/create-payment-intent', protect, async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order || order.user.toString() !== req.user.id) return res.status(404).json({ message: 'Order not found' });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalAmount * 100,
    currency: 'inr', // changed to INR since you're in Coimbatore
    metadata: { orderId: order._id.toString() }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
