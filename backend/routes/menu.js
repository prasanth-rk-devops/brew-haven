const express = require('express');
const multer = require('multer');
const { protect, admin } = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');
const { uploadImage } = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    const imageUrl = await uploadImage(req.file.path);

    const item = new MenuItem({
      name,
      description,
      price: Number(price),
      category,
      imageUrl
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;