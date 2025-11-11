const Movie = require('../../models/Movie');
const { createTmdbService } = require('./baseTmdbService');
const { fetchFromJavaAPI } = require('../fetchFromJavaAPI');
const { checkBackendHealth } = require('../backendHealth');

const baseMovieService = createTmdbService({
  model: Movie,
  baseEndpoint: '/movies',
  entityName: 'movie',
  prefetchTypes: ['popular', 'top-rated', 'upcoming', 'in-theatres', 'all'],
});

// Extra movie-specific categories
const fetchByTypeWithCache = async (type) => {
  const backendUp = await checkBackendHealth();

  if (backendUp) {
    try {
      const data = await fetchFromJavaAPI(`/movies/${type}`);
      const items = data.results || [];

      await Movie.updateOne(
        { type },
        { $set: { data: items } },
        { upsert: true }
      );
      console.log(`🎞️ Cached ${items.length} ${type} movies`);
      return items;
    } catch (err) {
      console.warn(`⚠️ Failed to fetch ${type} movies, fallback to MongoDB`);
    }
  }

  const cached = await Movie.findOne({ type });
  return cached?.data || [];
};

const getUpcoming = async () => fetchByTypeWithCache('upcoming');
const getInTheatres = async () => fetchByTypeWithCache('in-theatres');

module.exports = {
  ...baseMovieService,
  getUpcoming,
  getInTheatres,
};
