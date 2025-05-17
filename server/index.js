const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

popularMovies = [];

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js server!' });
});

app.get('/', (req, res) => {
  console.log('Hello from Node.js server start!');
});

const fetchPopularMovies = async () => {
  try {
    const res = await axios.get('http://localhost:8080/movies/popular');
    popularMovies = res.data.results;
    console.log('Popular Movies fetched and cached at startup');
  } catch (err) {
    console.error('Failed to fetch popular movies at startup:', err.message);
  }

};

app.get('/api/movies/popular', (req, res) => {
  console.log('Popular Movies fetched.');
  res.json(popularMovies);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  fetchPopularMovies();
});
