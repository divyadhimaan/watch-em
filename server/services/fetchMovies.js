const axios = require('axios');
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const Movie = require('../models/Movie');

const memoryCache = {
  'popular': [],
  'top-rated': [],
  'upcoming': [],
  'in-theatres': []
};

// Helper to update both MongoDB and memory
const updateCache = async (type, movies) => {
  if (!Array.isArray(movies) || movies.length === 0) return;

  await Movie.bulkWrite(
    movies.map((movie) => ({
      updateOne: {
        filter: { id: movie.id, type },
        update: { $set: { data: movie } },
        upsert: true,
      },
    }))
  );

  memoryCache[type] = movies;
  console.log(`📥 ${type} movies cached in MongoDB and memory`);
};


// Fetch movies from Java API


const fetchMoviesByType = async (type) => {
    // Checking cache
    const cached = await Movie.find({ type });
    if (cached.length > 0) {
      const movieList = cached.map(doc => doc.data);
      memoryCache[type] = movieList;
      console.log(`✅ Loaded ${type} movies from MongoDB cache`);
      return;
    }
  
    // Fetch from Java backend
    try {
      const res = await axios.get(`${backendURL}/movies/${type}`);
      const movies = res.data.results || [];
      console.log(`📥 Fetched ${movies.length} ${type} movies from Java API`);
      await updateCache(type, movies);
    } catch (err) {
      console.error(`❌ Failed to fetch ${type} movies:`, err.message);
    }
  };

const fetchMovieDetailsById = async (id) => {
    try {
        const res = await axios.get(`${backendURL}/movie/details/${id}`);
        console.log('Movie details fetched for ID:', id);
        // console.log(res.data);
        return res.data;
    } catch (err) {
        console.error('Failed to fetch movie details:', err.message);
        throw err;
    }
}
const getMoviesByType = (type) => memoryCache[type] || [];



module.exports = {
    fetchMoviesByType,
    fetchMovieDetailsById,
    getPopularMovies: () => getMoviesByType('popular'),
    getTopRatedMovies: () => getMoviesByType('top-rated'),
    getUpcomingMovies: () => getMoviesByType('upcoming'),
    getInTheatreMovies: () => getMoviesByType('in-theatres')
  };