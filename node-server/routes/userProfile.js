const express = require('express');
const axios = require('axios');

const router = express.Router();
const { fetchProfile } = require('../services/user/userProfile');


// POST /api/profile → calls Java backend
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const data = await fetchProfile(authHeader);
    res.json(data);

  }catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Profile Fetching failed' });
  }
});

module.exports = router;