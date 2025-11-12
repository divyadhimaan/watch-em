const express = require('express');
const router = express.Router();
const { handleCacheAndFetch } = require('./baseTmdbRouter');

const {
  fetchByType,
  getAll,
  getPopular,
  getTopRated,
  getUpcoming,
  getInTheatres,
  fetchBySlug,
  fetchDetailsById
} = require('../services/tmdb/movieService');

const movieRoutes = [
  { path: 'all', type: 'all', getter: getAll },
  { path: 'popular', type: 'popular', getter: getPopular },
  { path: 'top-rated', type: 'top-rated', getter: getTopRated },
  { path: 'upcoming', type: 'upcoming', getter: getUpcoming },
  { path: 'in-theatres', type: 'in-theatres', getter: getInTheatres },
];

movieRoutes.forEach(({ path, type, getter }) => {
  router.get(`/${path}`, async (_, res) => {
    await handleCacheAndFetch(getter, fetchByType, type, res);
  });
});

// 🧩 Filters
router.get('/filters/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const movies = await fetchBySlug(slug);
    res.json(movies);
  } catch (err) {
    console.error('❌ Failed to fetch movies by slug', err);
    res.status(500).json({ error: 'Failed to fetch movies by slug' });
  }
});

// 🎞️ Details : /api/movies/details/
router.get('/details/:id', async (req, res) => {
  console.log("Node route hit for details:", req.params.id);
  try {
    const { id } = req.params;
    const details = await fetchDetailsById(id);

    console.log("✅ Details fetched successfully:", details ? "YES" : "NO");
    console.log("📦 Details keys:", details ? Object.keys(details) : "null");
    

    res.json(details);
  } catch (err) {
    console.error('❌ Failed to fetch movie details', err);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

module.exports = router;