const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/mongo');
const { fetchMoviesByType } = require('./services/fetchMovies');
const { checkJavaBackend } = require('./services/javaHealth');
const { prefetchAll } = require('./services/fetchMovies');

//Load env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const BACKEND_HEALTH_URL = `${backendURL}/actuator/health`;

// Middleware
app.use(cors());
app.use(express.json());

// Import MongoDB setup
console.log('🧩 Connecting to MongoDB...');
connectMongoDB();

// Check Java backend connectivity once at startup
checkJavaBackend();

// Routes
app.use('/api', require('./routes/movieRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));


// Health check route
app.get('/health', (req, res) => res.status(200).send('✅ Watch-em backend is healthy'));



// Start server
app.listen(PORT, async () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  const isJavaAlive = await checkJavaBackend();

  if (isJavaAlive) {
    console.log(`🔗 Connected to Java backend at ${backendURL}`);
    await prefetchAll();
  } else {
    console.warn('⚠️ Java backend not reachable — skipping movie prefetch.');
  }
});
