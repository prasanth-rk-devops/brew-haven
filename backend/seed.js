require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({});
  await MenuItem.deleteMany({});

  await User.create({
    name: 'Admin Prasanth',
    email: 'admin@brew.com',
    password: 'AdminStrongPass123!',
    role: 'admin'
  });

  await MenuItem.insertMany([
    { name: 'Filter Coffee', description: 'Traditional South Indian filter coffee', price: 40, category: 'drink', imageUrl: 'https://example.com/filter-coffee.jpg' },
    { name: 'Masala Dosa', description: 'Crispy dosa with potato masala', price: 80, category: 'food', imageUrl: 'https://example.com/masala-dosa.jpg' }
  ]);

  console.log('Database seeded');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800' // latte art
imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' // espresso
imageUrl: 'https://images.unsplash.com/photo-1445112098124-4e70805c935d?w=800' // cappuccino
