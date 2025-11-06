import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

/**
 * Lightweight modal to show receipt or confirmation.
 * Props:
 *  - open: boolean
 *  - onClose: fn
 *  - receipt: object (optional)
 */
export default function CheckoutModal({ open, onClose, receipt }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => {
      if (e.target === e.currentTarget) onClose?.();
    }}>
      <div className="modal-container">
        <button onClick={onClose} className="modal-close" aria-label="Close">✕</button>
        <h3 className="modal-title">{receipt ? 'Order Receipt' : 'Order Placed'}</h3>

        {receipt ? (
          <div className="modal-body">
            <div className="receipt-row"><strong>Receipt ID:</strong> {receipt.receiptId}</div>
            <div className="receipt-row"><strong>Total:</strong> ₹{receipt.total}</div>
            <div className="receipt-row"><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</div>
            <div className="receipt-items">
              <strong>Items:</strong>
              <ul>
                {receipt.items.map((it, i) => (
                  <li key={i}>{it.name} x {it.qty} = ₹{it.subtotal}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="modal-body"><p>Your order is being processed...</p></div>
        )}

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
