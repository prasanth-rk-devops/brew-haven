const express = require('express');
const multer = require('multer');
const { protect, admin } = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');
const { uploadImage } = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const imageUrl = await uploadImage(req.file.path);
  const item = await MenuItem.create({ name, description, price, category, imageUrl });
  res.status(201).json(item);
});

module.exports = router;
