// components/OrderForm.jsx
import React, { useState } from 'react';

const OrderForm = ({ onPlaceOrder }) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price || !quantity) {
      setMessage('Please enter both price and quantity.');
      return;
    }

    // Mock placing order
    onPlaceOrder({ price: parseFloat(price), quantity: parseFloat(quantity) });
    setMessage(`Order placed: ${quantity} BTC at $${price} each.`);
    setPrice('');
    setQuantity('');
  };

  return (
    <div className="order-form">
      <h3>Place Limit Order</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="price">Price (USD):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity (BTC):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
