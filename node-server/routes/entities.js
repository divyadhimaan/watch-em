// routes/entities.ts
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/filters/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await axios.get(`${process.env.JAVA_API_BASE_URL}/entities/filters/${slug}`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to fetch entities' });
  }
});

module.exports = router;