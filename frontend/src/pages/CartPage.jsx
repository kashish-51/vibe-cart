import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";
import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import "./cart.css";

export default function CartPage() {
  const { items, total, loading, updateItem, removeItem } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="cart-loading">Loading your cart...</div>;
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="cart-shop-link">Go shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            {items.map((it) => (
              <div key={it.id} className="cart-item-wrapper">
                <CartItem item={it} onUpdate={updateItem} onRemove={removeItem} />
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free">Free</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                if (!items.length) return;
                if (isAuthenticated) navigate('/checkout');
                else navigate('/login', { state: { from: { pathname: '/checkout' } } });
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
