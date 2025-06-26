const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';

// Middleware
app.use(cors());
app.use(express.json());

popularMovies = [];
topRatedMovies = [];

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js server!' });
});

app.get('/', (req, res) => {
  console.log('Hello from Node.js server start!');
});

const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`${process.env.JAVA_API_BASE_URL}/movies/popular`);
    popularMovies = res.data.results;

    console.log('Popular Movies fetched and cached at startup');
    console.log('Popular Movies fetched:', popularMovies.length);
  } catch (err) {
    console.error('Failed to fetch popular movies at startup:', err.message);
  }
};

const fetchTopRatedMovies = async () => {
  try {
    const res = await axios.get(`${process.env.JAVA_API_BASE_URL}/movies/top-rated`);
    topRatedMovies = res.data.results;

    console.log('Top Rated Movies fetched and cached at startup');
    console.log('Top Rated Movies fetched:', topRatedMovies.length);
  } catch (err) {
    console.error('Failed to fetch popular movies at startup:', err.message);
  }
};

app.get('/api/movies/popular', async (req, res) => {

  if(popularMovies.length === 0) {
    console.log('Top Rated Movies not cached, fetching from API...');
    await fetchPopularMovies();
  }else{
    console.log('Popular Movies fetched.');
    res.json(popularMovies);
  }
});

app.get('/api/movies/top-rated', async (req, res) => {
  if(topRatedMovies.length === 0) {
    console.log('Top Rated Movies not cached, fetching from API...');
    await fetchTopRatedMovies();
  }else{
    console.log('Top Rated Movies fetched.');
    res.json(topRatedMovies);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log(`Connected to Java backend at ${backendURL}`);
  fetchPopularMovies();
  fetchTopRatedMovies();
});
