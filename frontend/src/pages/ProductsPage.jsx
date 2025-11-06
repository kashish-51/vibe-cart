import React, { useEffect, useState, useContext } from 'react';
import { getProducts } from '../api/api';
import CartContext from '../contexts/CartContext';
import './product.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext); // expects addToCart(productId, qty)

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const items = Array.isArray(res) ? res : res?.data || [];
        if (mounted) setProducts(items);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const isLoggedIn = () => {
    try {
      if (typeof window === 'undefined') return false;
      return !!(localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('user'));
    } catch (e) {
      return false;
    }
  };

  // Add handler: use Mongo _id exposed as product.id
  const handleAdd = async (product, qty = 1) => {
    if (!isLoggedIn()) {
      alert('Please log in to add items to cart.');
      return;
    }

    if (!addToCart || typeof addToCart !== 'function') {
      console.error('addToCart not available in CartContext', addToCart);
      alert('Cart unavailable. Check console for details.');
      return;
    }

    const productId = product.id;
    if (!productId) {
      console.error('No product identifier available (sku or id missing) for', product);
      alert('Unable to add this product to cart (missing id).');
      return;
    }

    try {
      // call provider with ObjectId-based productId
      await addToCart(productId, qty);
      // optional simple feedback
      alert('Added to cart');
    } catch (err) {
      console.error('addToCart failed:', err);
      alert('Failed to add to cart. Try again.');
    }
  };

  return (
    <div className="products-page">
      <h1>Explore our Products</h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : products.length === 0 ? (
        <p className="empty-text">No products available</p>
      ) : (
        <div className="products-row">
          {products.map((p, idx) => (
            <div key={p.sku || idx} className="product-card">
              {p.image && <img src={p.image} alt={p.name} className="product-image" loading="lazy" />}
              <div className="product-name">{p.name}</div>
              <div className="product-price">₹{p.price}</div>
              {p.description && <div className="product-desc">{p.description}</div>}

              <div className="product-footer">
                <button
                  className="btn-add"
                  onClick={() => handleAdd(p, 1)}
                >
                  Add to Cart
                </button>
                {p.sku && <span className="product-sku">SKU: {p.sku}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
