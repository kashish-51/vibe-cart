import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginSignup from './pages/LoginSignup';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </main>

    </div>
  );
}
