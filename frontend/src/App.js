import React, { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const order = (id) => {
    fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Order failed'));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Ice Cream Shop</h1>
      {message && <p>{message}</p>}
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price.toFixed(2)}{' '}
            <button onClick={() => order(p.id)}>Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
