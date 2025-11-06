import React from 'react';

/**
 * ProductCard
 * Props:
 *  - product: { id, name, price, description }
 *  - onAdd(productId, qty)
 */
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <div style={{ minHeight: 32, fontWeight: 700 }}>{product.name}</div>
      <div style={{ margin: '8px 0', color: 'var(--text)' }}>₹{product.price}</div>
      {product.description && <div className="muted" style={{ marginBottom: 8 }}>{product.description}</div>}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="btn" onClick={() => onAdd(product.id, 1)}>Add</button>
        <small className="muted">SKU: {product.sku || '-'}</small>
      </div>
    </div>
  );
}
