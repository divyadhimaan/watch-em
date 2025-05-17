const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

cachedTags = [];

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js server!' });
});

app.get('/', (req, res) => {
  console.log('Hello from Node.js server start!');
});

const fetchTagsOnStartup = async () => {
  try {
    const res = await axios.get('http://localhost:8080/genres');
    cachedTags = res.data;
    console.log('Tags fetched and cached at startup');
  } catch (err) {
    console.error('Failed to fetch tags at startup:', err.message);
  }

};

app.get('/api/tags', (req, res) => {
  console.log('Tags fetched.');
  res.json(cachedTags);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  fetchTagsOnStartup();
});
