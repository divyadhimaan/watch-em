const axios = require('axios');
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const Movie = require('../models/Movie');
const { checkBackendHealth } = require('./backendHealth');
const { handleAxiosError } = require('../utils/errorHandler'); 

const memoryCache = {
  'popular': [],
  'top-rated': [],
  'upcoming': [],
  'in-theatres': [],
  'all': [],
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


// Fetch movies by type
const fetchMoviesByType = async (type) => {
  // Try from MongoDB cache first
  const cached = await Movie.find({ type });
  if (cached.length > 0) {
    const movieList = cached.map(doc => doc.data);
    memoryCache[type] = movieList;
    console.log(`✅ Loaded ${type} movies from MongoDB cache`);
    return;
  }

  // Check Java backend health before fetching
  const backendUp = await checkBackendHealth();
  if (!backendUp) {
    console.warn(`⚠️ Skipping Backend API fetch for '${type}' — backend is down`);
    return;
  }

  try {
    const res = await axios.get(`${backendURL}/movies/${type}`);


    const movies = res.data.results || [];
    console.log(`📥 Fetched ${movies.length} ${type} movies from Backend API`);
    await updateCache(type, movies);
  } catch (err) {
    handleAxiosError(err, `fetchMoviesByType(${type})`);
    throw err;
  }
};

// Fetch movie details by ID (with MongoDB fallback)
const fetchMovieDetailsById = async (id) => {
  const backendUp = await checkBackendHealth();
  if (backendUp) {
    try {
      const res = await axios.get(`${backendURL}/movie/details/${id}`);
      console.log('🎬 Movie details fetched for ID:', id);

      await Movie.updateOne(
        { id, type: 'details' },
        { $set: { data: res.data } },
        { upsert: true }
      );

      return res.data;
    } catch (err) {
      handleAxiosError(err, `fetchMovieDetailsById(${id})`);
      console.warn(`⚠️ Falling back to MongoDB for movie ID: ${id}`);
    }
  }
  // Fallback to MongoDB
  const cached = await Movie.findOne({ id, type: 'details' });
  if (cached) {
    console.log('✅ Movie details loaded from MongoDB cache:', id);
    return cached.data;
  }

  throw new Error(`❌ Movie details not found for ID: ${id}`);
}


// Fetch movies by slug (category-based)
const fetchMoviesBySlug = async (slug) => {
  const slugType = `slug:${slug}`;
  const backendUp = await checkBackendHealth();

  if (backendUp) {
    try {
      const res = await axios.get(`${backendURL}/movies/filter/${slug}`);
      const movies = res.data.results || [];
      console.log('📥 Movies fetched from Backend API for slug:', slug);

      await Movie.updateOne(
        { type: slugType },
        { $set: { data: movies } },
        { upsert: true }
      );

      return movies;
    } catch (err) {
      handleAxiosError(err, `fetchMoviesBySlug(${slug})`);
      console.warn(`⚠️ Falling back to MongoDB for slug: ${slug}`);
    }
  }

  // Fallback
  const cached = await Movie.findOne({ type: slugType });
  if (cached && Array.isArray(cached.data)) {
    console.log('✅ Slug movies loaded from MongoDB cache:', slug);
    return cached.data;
  }

  throw new Error(`❌ Slug movies not found in MongoDB for: ${slug}`);
};


const getMoviesByType = (type) => memoryCache[type] || [];

const prefetchAll = async () => {
  const types = ['popular', 'top-rated', 'upcoming', 'in-theatres', 'all'];

  for (const type of types) {
    try {
      await fetchMoviesByType(type);
    } catch (err) {
      if (err?.response?.status === 403) {
        console.warn('🚫 Skipping remaining prefetch — authorization issue detected.');
        break;
      }
    }
  }

  console.log('✅ Finished prefetching all movies');
};


module.exports = {
    fetchMoviesByType,
    fetchMovieDetailsById,
    fetchMoviesBySlug,
    prefetchAll,
    getAllMovies: () => getMoviesByType('all'),
    getPopularMovies: () => getMoviesByType('popular'),
    getTopRatedMovies: () => getMoviesByType('top-rated'),
    getUpcomingMovies: () => getMoviesByType('upcoming'),
    getInTheatreMovies: () => getMoviesByType('in-theatres')
  };