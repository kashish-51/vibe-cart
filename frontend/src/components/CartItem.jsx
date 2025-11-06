import React, { useState } from 'react';
import './cart.css';

export default function CartItem({ item, onUpdate, onRemove }) {
  const [localQty, setLocalQty] = useState(item.qty);

  const applyQty = (q) => {
    if (q < 1) return;
    setLocalQty(q);
    if (q !== item.qty) onUpdate(item.id, q);
  };

  return (
    <div className="cart-row">
      {/* 🖼️ Product Image */}
      <div className="cart-image">
        <img
          src={
            (item && item.product && (item.product.image || item.product.img)) ||
            (item && item.image) ||
            // inline placeholder to avoid network/DNS failures
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAnIGhlaWdodD0nODAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzgwJyBoZWlnaHQ9JzgwJyBmaWxsPScjZWVlZWVlJy8+PHBhdGggZD0nTTE2IDY0IGg0OGMxLjEgMCAyLS45IDItMlYxOGMwLTEuMS0uOS0yLTItMkgxNmMtMS4xIDAtMiAuOS0yIDJ2NDRjMCAxLjEuOSAyIDIgMnonIGZpbGw9JyNkZGRkZGQnLz48Y2lyY2xlIGN4PSc0MCcgY3k9JzMyJyByPScxOCcgZmlsbD0nI2RkZGRkZCcvPjwvc3ZnPg=="
          }
          alt={(item && item.product && item.product.name) || "Product"}
        />
      </div>

      {/* 📦 Product Info */}
      <div className="cart-info">
        <div className="cart-product-name">{item.product.name}</div>
        <div className="cart-price">₹{item.product.price}</div>
      </div>

      {/* 🔢 Quantity */}
      <div className="cart-qty">
        <input
          type="number"
          min={1}
          value={localQty}
          onChange={(e) => setLocalQty(Number(e.target.value))}
          onBlur={() => applyQty(Number(localQty))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyQty(Number(localQty));
          }}
        />
      </div>

      {/* 💰 Subtotal */}
      <div className="cart-subtotal">₹{item.subtotal}</div>

      {/* ❌ Remove Button */}
      <div className="cart-remove">
        <button className="remove-btn" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
