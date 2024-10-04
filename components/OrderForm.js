// components/OrderForm.js
import { useState } from 'react';

const OrderForm = () => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Limit Order: ${quantity} BTC at $${price}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
        className="m-2 p-2 border rounded"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
        className="m-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Place Order</button>
    </form>
  );
};

export default OrderForm;
