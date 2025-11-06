require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

// root
app.get('/', (req, res) => res.json({ message: 'Vibe Cart Backend' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
