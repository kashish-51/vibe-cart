import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import CartContext from '../contexts/CartContext';
import './navbar.css'; // 👈 external CSS

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = useMemo(
    () => (Array.isArray(items) ? items.reduce((n, it) => n + (it.qty || 0), 0) : 0),
    [items]
  );

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span> Vibe Cart
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            className={`nav-link${location.pathname === '/' ? ' active' : ''}`}
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            className={`nav-link nav-cart${location.pathname === '/cart' ? ' active' : ''}`}
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`Cart items: ${cartCount}`}>
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="nav-auth">
              <span className="nav-user">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link
              className={`nav-link${location.pathname === '/login' ? ' active' : ''}`}
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
