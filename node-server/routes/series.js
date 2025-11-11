const express = require('express');
const router = express.Router();
const { handleCacheAndFetch } = require('./baseTmdbRouter');

const {
  fetchSeriesByType,
  getAllSeries,
  getPopularSeries,
  getTopRatedSeries,
  getOnAirSeries,
  fetchSeriesBySlug,
  fetchSeriesDetailsById
} = require('../services/tmdb/seriesService');

// 📺 Series Routes
router.get('/all', async (_, res) => handleCacheAndFetch(getAllSeries, fetchSeriesByType, 'all', res));
router.get('/popular', async (_, res) => handleCacheAndFetch(getPopularSeries, fetchSeriesByType, 'popular', res));
router.get('/top-rated', async (_, res) => handleCacheAndFetch(getTopRatedSeries, fetchSeriesByType, 'top-rated', res));
router.get('/on-air', async (_, res) => handleCacheAndFetch(getOnAirSeries, fetchSeriesByType, 'on-air', res));

// 🧩 Filters
router.get('/filters/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const series = await fetchSeriesBySlug(slug);
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
    const details = await fetchSeriesDetailsById(id);
    res.json(details);
  } catch (err) {
    console.error('❌ Failed to fetch series details', err);
    res.status(500).json({ error: 'Failed to fetch series details' });
  }
});

module.exports = router;
