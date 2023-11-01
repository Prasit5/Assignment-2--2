const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Products = require('./models/modelsProduct'); 

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pdol1:qwert12345@marketplace.4b3x2ke.mongodb.net/Marketplace?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello, Welcome to DressStore Application');
});

app.get('/api/products', (req, res) => {
  Products.find()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err }));
});

app.post('/api/products', (req, res) => {
  const newProduct = new Products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });

  newProduct.save()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err }));
});

app.get('/api/products/:id', (req, res) => {
  Products.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ error: err }));
});

app.put('/api/products/:id', (req, res) => {
  Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ error: err }));
});

app.delete('/api/products/:id', (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ error: err }));
});

app.delete('/api/products', (req, res) => {
  Products.deleteMany()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err }));
});

app.get('/api/products', (req, res) => {
  const query = req.query.q;
  const regex = new RegExp(query, 'i');
  Products.find({ name: regex })
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err }));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
