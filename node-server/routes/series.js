const express = require('express');
const router = express.Router();
const { handleCacheAndFetch } = require('./baseTmdbRouter');

const {
  fetchByType,
  getAll,
  getPopular,
  getTopRated,
  getOnAir,
  fetchBySlug,
  fetchDetailsById
} = require('../services/tmdb/seriesService');

const movieRoutes = [
  { path: 'all', type: 'all', getter: getAll },
  { path: 'popular', type: 'popular', getter: getPopular },
  { path: 'top-rated', type: 'top-rated', getter: getTopRated },
  { path: 'on-air', type: 'on-air', getter: getOnAir },
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
    const series = await fetchBySlug(slug);
    res.json(series);
  } catch (err) {
    console.error('❌ Failed to fetch series by slug', err);
    res.status(500).json({ error: 'Failed to fetch series by slug' });
  }
});

// 🎞️ Details
router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const details = await fetchDetailsById(id);
    res.json(details);
  } catch (err) {
    console.error('❌ Failed to fetch series details', err);
    res.status(500).json({ error: 'Failed to fetch series details' });
  }
});

module.exports = router;
