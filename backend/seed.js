require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    await User.deleteMany({});
    await MenuItem.deleteMany({});

    await User.create({
      name: 'Admin Prasanth',
      email: 'admin@brewhaven.com',
      password: 'AdminSecurePass2026!',
      role: 'admin'
    });

    await MenuItem.insertMany([
      {
        name: 'Filter Coffee',
        description: 'Traditional South Indian filter coffee with chicory',
        price: 45,
        category: 'drink',
        imageUrl: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=800'
      },
      {
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam',
        price: 140,
        category: 'drink',
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800'
      },
      {
        name: 'Masala Dosa',
        description: 'Crispy rice crepe with spiced potato filling',
        price: 90,
        category: 'food',
        imageUrl: 'https://images.unsplash.com/photo-1630409351340-2e2e3c4e0d6e?w=800'
      }
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });