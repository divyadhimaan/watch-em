const axios = require('axios');
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const Movie = require('../models/Movie');

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

        await Movie.updateOne(
          { id, type: 'details' },
          { $set: { data: res.data } },
          { upsert: true }
        );    

        return res.data;
    } catch (err) {
      console.warn('⚠️ Java API failed, falling back to MongoDB for ID:', id);

      const cached = await Movie.findOne({ id, type: 'details' });
      if (cached) {
        console.log('✅ Movie details loaded from MongoDB cache:', id);
        return cached.data;
      }
      console.error('❌ Movie details not found in MongoDB:', err.message);
      throw err;
    }
}
const fetchMoviesBySlug = async (slug) => {
  const slugType = `slug:${slug}`;
  
  try {
    const res = await axios.get(`${backendURL}/movies/filter/${slug}`);
    const movies = res.data.results || [];
    console.log('📥 Movies fetched from Java API for slug:', slug);

    await Movie.updateOne(
      { type: slugType },
      { $set: { data: movies } },
      { upsert: true }
    );

    return movies;
  } catch (err) {
    console.warn('⚠️ Java API failed, falling back to MongoDB for slug:', slug);

    const cached = await Movie.findOne({ type: slugType });
    if (cached && Array.isArray(cached.data)) {
      console.log('✅ Slug movies loaded from MongoDB cache:', slug);
      return cached.data;
    }

    console.error('❌ Slug movies not found in MongoDB:', err.message);
    throw err;
  }
}


const getMoviesByType = (type) => memoryCache[type] || [];


module.exports = {
    fetchMoviesByType,
    fetchMovieDetailsById,
    fetchMoviesBySlug,
    getAllMovies: () => getMoviesByType('all'),
    getPopularMovies: () => getMoviesByType('popular'),
    getTopRatedMovies: () => getMoviesByType('top-rated'),
    getUpcomingMovies: () => getMoviesByType('upcoming'),
    getInTheatreMovies: () => getMoviesByType('in-theatres')
  };