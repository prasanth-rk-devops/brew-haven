const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['drink', 'food', 'snack'], required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);