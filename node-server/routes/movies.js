const express = require('express');
const router = express.Router();
const { handleCacheAndFetch } = require('./baseTmdbRouter');

const {
  fetchMoviesByType,
  getAllMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getInTheatreMovies,
  fetchMoviesBySlug,
  fetchMovieDetailsById
} = require('../services/tmdb/movieService');

// 🎬 Movie Routes
router.get('/all', async (_, res) => handleCacheAndFetch(getAllMovies, fetchMoviesByType, 'all', res));
router.get('/popular', async (_, res) => handleCacheAndFetch(getPopularMovies, fetchMoviesByType, 'popular', res));
router.get('/top-rated', async (_, res) => handleCacheAndFetch(getTopRatedMovies, fetchMoviesByType, 'top-rated', res));
router.get('/upcoming', async (_, res) => handleCacheAndFetch(getUpcomingMovies, fetchMoviesByType, 'upcoming', res));
router.get('/in-theatres', async (_, res) => handleCacheAndFetch(getInTheatreMovies, fetchMoviesByType, 'in-theatres', res));

// 🧩 Filters
router.get('/filters/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const movies = await fetchMoviesBySlug(slug);
    res.json(movies);
  } catch (err) {
    console.error('❌ Failed to fetch movies by slug', err);
    res.status(500).json({ error: 'Failed to fetch movies by slug' });
  }
});

// 🎞️ Details
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const details = await fetchMovieDetailsById(id);
    res.json(details);
  } catch (err) {
    console.error('❌ Failed to fetch movie details', err);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

module.exports = router;
