import React, { useState, useContext } from 'react';
import CartContext from '../contexts/CartContext';
import { checkout } from '../api/api';
import AuthContext from '../contexts/AuthContext';
import CheckoutModal from '../components/CheckoutModal';
import useProtectedRoute from '../hooks/useProtectedRoute';

export default function CheckoutPage(){
  useProtectedRoute(); // redirect to /login if not authenticated

  const { items, total, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [open, setOpen] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      // useCartItemsFromUser will instruct backend to read this user's DB cart
      const res = await checkout({ useCartItemsFromUser: true, name, email });
      // backend returns { receiptId, total, timestamp, items }
      const data = res.data || res;
      setReceipt(data);
      setOpen(true);

      // refresh cart after checkout (should be empty if backend cleared it)
      if (fetchCart) await fetchCart();
    } catch(err){
      console.error(err);
      // optionally show UI error
    }
    setLoading(false);
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order and enter your details to complete the purchase.</p>
      </div>
      {items.length === 0 ? (
        <p className="checkout-empty">Your cart is empty</p>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-card">
            <h3>Order Summary</h3>
            <div className="order-list">
              {items.map(it => (
                <div key={it.id} className="order-row">
                  <div className="order-left">
                    <div className="order-name">{it.product.name}</div>
                    <div className="order-qty">Qty: {it.qty}</div>
                  </div>
                  <div className="order-subtotal">₹{it.subtotal}</div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>
          </section>

          <section className="checkout-card">
            <h3>Your Details</h3>
            <form onSubmit={submit} className="details-form">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>
              <div className="actions">
                <button className="btn" disabled={loading}>{loading ? 'Processing...' : 'Place order'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
      <CheckoutModal open={open} onClose={() => setOpen(false)} receipt={receipt} />
    </div>
  );
}
