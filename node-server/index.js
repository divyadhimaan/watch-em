const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/mongo');
const { checkBackendHealth } = require('./services/backendHealth');

// TMDB Prefetch services
const movieService = require('./services/tmdb/movieService');
const seriesService = require('./services/tmdb/seriesService');

// Load env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const BACKEND_HEALTH_URL = `${backendURL}/actuator/health`;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('🧩 Connecting to MongoDB...');
connectMongoDB();

// Check Java backend health once at startup
checkBackendHealth();

// Routes
app.use('/api/profile', require('./routes/userProfile'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/series', require('./routes/series'));
app.use('/api/entities', require('./routes/entities'));

app.use('/api/auth', require('./routes/authRoutes'));

// Health check route
app.get('/health', (req, res) => res.status(200).send('✅ Watch-em backend is healthy'));

// Startup logic
app.listen(PORT, async () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);

  const isJavaAlive = await checkBackendHealth();

  if (isJavaAlive) {
    console.log(`🔗 Connected to Java backend at ${backendURL}`);

    // Prefetch both movie + series caches
    console.log('📦 Prefetching TMDB data...');
    await Promise.allSettled([
      movieService.prefetchAll(),
      seriesService.prefetchAll(),
    ]);
    console.log('✅ Prefetch complete for movies and series');
  } else {
    console.warn('⚠️ Java backend not reachable — skipping TMDB prefetch.');
  }
});
