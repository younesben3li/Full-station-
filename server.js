// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/fullstation'; // replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route definitions
app.get('/', (req, res) => {
  res.send('Welcome to Full Station API');
});

// Example route
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example API endpoint.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});