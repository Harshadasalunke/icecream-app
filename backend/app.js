const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Vanilla', price: 2.5 },
  { id: 2, name: 'Chocolate', price: 3.0 },
  { id: 3, name: 'Strawberry', price: 2.8 },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/order', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(400).json({ error: 'Invalid product' });
  const total = product.price * quantity;
  res.json({ message: `Order received for ${quantity} ${product.name}(s). Total $${total.toFixed(2)}` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
