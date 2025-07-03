const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/mongo');


const { fetchMoviesByType } = require('./services/fetchMovies');



//Load env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';


// Middleware
app.use(cors());
app.use(express.json());

// Import MongoDB setup
connectMongoDB();



// Routes
const movieRoutes = require('./routes/movieRoutes');


app.use('/api', movieRoutes);



// Health check route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js server!' });
});

app.get('/', (req, res) => {
  res.send('✅ Watch-em backend is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('✅ Watch-em backend is healthy');
});

const prefetchAllMovies = async () => {
  try {
    console.log('📦 Pre-fetching popular & top-rated movies...');
    await fetchMoviesByType('popular');
    await fetchMoviesByType('top-rated');
    await fetchMoviesByType('upcoming');
    await fetchMoviesByType('in-theatres');
    await fetchMoviesByType('all');
    console.log('✅ Finished prefetching all movies');
  } catch (err) {
    console.error('❌ Prefetching failed:', err);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log(`Connected to Java backend at ${backendURL}`);


  prefetchAllMovies();
});
