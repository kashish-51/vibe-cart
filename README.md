# Nexora E-Commerce Platform

A full-stack e-commerce application built with React (frontend) and Node.js/Express (backend), featuring user authentication, product browsing, shopping cart, and checkout functionality.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Base URLs](#base-urls)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Running the Application](#running-the-application)
- [Seeding Data](#seeding-data)

## 🎯 Project Overview

Nexora is an e-commerce platform that allows users to:
- Register and login with JWT authentication
- Browse products
- Add items to shopping cart
- Update cart quantities
- Complete checkout and generate receipts

The project consists of two main parts:
- **Backend**: RESTful API built with Express.js and MongoDB
- **Frontend**: React application with React Router for navigation

## 📸 Screenshots

### Login Page
The clean and minimalist login interface where users can authenticate to access the platform.

![Login Page](./screenshots/login-page.png)

### Products Page
Browse through a wide selection of products displayed in a responsive grid layout. Each product card shows the image, name, price, description, and an "Add to Cart" button.

![Products Page](./screenshots/products-page.png)

### Shopping Cart
View and manage items in your shopping cart. Update quantities, remove items, and see the order summary with total calculations.

![Shopping Cart](./screenshots/cart-page.png)

### Checkout Page
Review your order and enter personal details to complete the purchase. The page displays order summary and customer information form.

![Checkout Page](./screenshots/checkout-page.png)

### Order Receipt
After successful checkout, a receipt modal displays the order confirmation with receipt ID, total amount, transaction time, and itemized list of purchased products.

![Order Receipt](./screenshots/order-receipt.png)

**Note**: To add screenshots, place your image files in a `screenshots/` directory at the root of the project with the following names:
- `login-page.png`
- `products-page.png`
- `cart-page.png`
- `checkout-page.png`
- `order-receipt.png`

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication (jsonwebtoken)
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Context API** - State management (Auth & Cart)

## 📁 Project Structure

```
nexora/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── data/
│   │   └── products.seed.json # Seed data for products
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User model schema
│   │   ├── Product.js         # Product model schema
│   │   ├── CartItem.js        # Cart item model schema
│   │   └── Receipt.js         # Receipt model schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── cart.js            # Shopping cart routes
│   │   └── checkout.js        # Checkout routes
│   ├── seed.js                # Database seeding script
│   ├── server.js              # Express server entry point
│   └── package.json           # Backend dependencies
│
└── frontend/
    ├── public/
    │   └── index.html         # HTML template
    ├── src/
    │   ├── api/
    │   │   └── api.js         # API client configuration
    │   ├── components/
    │   │   ├── Navbar.jsx     # Navigation component
    │   │   ├── ProductCard.jsx # Product display component
    │   │   ├── CartItem.jsx   # Cart item component
    │   │   └── CheckoutModal.jsx # Checkout modal component
    │   ├── contexts/
    │   │   ├── AuthContext.jsx # Authentication context
    │   │   └── CartContext.jsx  # Shopping cart context
    │   ├── hooks/
    │   │   └── useProtectedRoute.jsx # Protected route hook
    │   ├── pages/
    │   │   ├── ProductsPage.jsx # Products listing page
    │   │   ├── CartPage.jsx     # Shopping cart page
    │   │   ├── CheckoutPage.jsx # Checkout page
    │   │   └── LoginSignup.jsx  # Authentication page
    │   ├── App.js              # Main app component
    │   └── index.js            # React entry point
    └── package.json            # Frontend dependencies
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nexora
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file (see Environment Variables section)
# Start the server
npm start
# Or use nodemon for development (if installed globally)
nodemon server.js
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000` (default React port)
The backend will run on `http://localhost:4000` (as configured)

## 🔐 Environment Variables

### Backend (.env file)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/nexora
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nexora

# Server Port (optional, defaults to 4000)
PORT=4000

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# JWT Expiry Time (optional, defaults to 7d)
JWT_EXPIRY=7d
```

### Frontend (.env file)

Create a `.env` file in the `frontend/` directory (optional):

```env
# API Base URL (optional, defaults to http://localhost:4000/api)
REACT_APP_API_URL=http://localhost:4000/api
```

**Note**: If `REACT_APP_API_URL` is not set, the frontend defaults to `http://localhost:4000/api`

## 🌐 Base URLs

### Backend API
- **Development**: `http://localhost:4000`
- **API Base Path**: `http://localhost:4000/api`

### Frontend
- **Development**: `http://localhost:3000`
- **Production**: Configure based on your hosting provider

## 📡 API Endpoints

All API endpoints are prefixed with `/api`

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.
### Product Endpoints
#### GET `/api/products`
Get all products.
#### GET `/api/products/:id`
Get a single product by ID.

### Cart Endpoints

**All cart endpoints require authentication (Bearer token in Authorization header)**

#### GET `/api/cart`
Get user's shopping cart.
#### POST `/api/cart`
Add item to cart.
#### PUT `/api/cart/:id`
Update cart item quantity.
#### DELETE `/api/cart/:id`
Remove item from cart.

#### POST `/api/checkout`
Process checkout and create receipt.


```

## ▶ Running the Application

### Development Mode

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:4000
   ```

3. **Start Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Frontend runs on http://localhost:3000
   ```

4. **Seed Database** (optional, see Seeding Data section)

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder using a static file server
```

## 🌱 Seeding Data

To populate the database with sample products:

```bash
cd backend
node seed.js
```

This will:
- Connect to MongoDB
- Clear existing products
- Insert products from `backend/data/products.seed.json`

**Note**: Make sure your `.env` file is configured with the correct `MONGO_URI` before running the seed script.

## 🔒 Authentication Flow

1. User registers/logs in via `/api/auth/signup` or `/api/auth/login`
2. Backend returns a JWT token
3. Frontend stores the token in `localStorage`
4. All authenticated requests include the token in the `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
5. Backend middleware (`auth.js`) validates the token on protected routes

## 📝 Notes

- The backend uses JWT tokens for authentication with a default expiry of 7 days
- Passwords are hashed using bcryptjs before storing in the database
- Cart operations are user-specific (tied to the authenticated user's ID)
- The checkout process can either use provided cart items or the user's saved cart
- All API responses follow RESTful conventions
- CORS is enabled to allow frontend-backend communication

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Verify MongoDB is running
   - Check `MONGO_URI` in `.env` file
   - Ensure network access if using MongoDB Atlas

2. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Or kill the process using port 4000

3. **JWT Errors**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token expiry settings

### Frontend Issues

1. **API Connection Error**
   - Verify backend server is running
   - Check `REACT_APP_API_URL` in frontend `.env`
   - Ensure CORS is properly configured

2. **Authentication Issues**
   - Clear `localStorage` and login again
   - Check token expiry

## 📄 License

ISC

---

**Happy Coding! 🚀**

