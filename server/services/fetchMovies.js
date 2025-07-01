const axios = require('axios');
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const Movie = require('../models/Movie');



let popularMovies = [];
let topRatedMovies = [];

// Fetch movies from Java API


const fetchMoviesByType = async (type) => {
    // Checking cache
    const cached = await Movie.find({ type });
    if (cached.length > 0) {
      const movieList = cached.map(doc => doc.data);
      console.log(`✅ Loaded ${type} movies from MongoDB cache`);
  
      // Update local memory store
      if (type === 'popular') popularMovies = movieList;
      if (type === 'top-rated') topRatedMovies = movieList;
  
      return;
    }
  
    // Fetch from Java backend
    try {
      const res = await axios.get(`${backendURL}/movies/${type}`);
      const movies = res.data.results;
  
      // Cache in MongoDB
      const saveOps = movies.map((movie) =>
        Movie.updateOne(
          { id: movie.id, type },
          { $set: { data: movie } },
          { upsert: true }
        )
      );
      await Promise.all(saveOps);
  
      // Update memory cache
      if (type === 'popular') popularMovies = movies;
      if (type === 'top-rated') topRatedMovies = movies;
  
      console.log(`📥 ${type} movies cached in MongoDB`);
    } catch (err) {
      console.error(`❌ Failed to fetch ${type} movies:`, err.message);
    }
  };

const fetchMovieDetailsById = async (id) => {
    try {
        const res = await axios.get(`${backendURL}/movie/details/${id}`);
        console.log('Movie details fetched for ID:', id);
        return res.data;
    } catch (err) {
        console.error('Failed to fetch movie details:', err.message);
        throw err;
    }
}

const getPopularMovies = () => popularMovies;
const getTopRatedMovies = () => topRatedMovies;


module.exports = {
    fetchMoviesByType,
    fetchMovieDetailsById,
    getPopularMovies,
    getTopRatedMovies,
  };