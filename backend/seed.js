require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');
const productsData = require('./data/products.seed.json');

(async () => {
  try {
    await connectDB();
    console.log('Connected — seeding products...');

    // remove existing products
    await Product.deleteMany({});
    const inserted = await Product.insertMany(productsData);
    console.log(`Inserted ${inserted.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
