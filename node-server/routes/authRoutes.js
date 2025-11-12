const express = require('express');
const router = express.Router();  
const { authenticateUser, registerUser } = require('../services/authenticate');


// POST /api/auth/login → calls Java backend
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const data = await authenticateUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
});

// POST /api/auth/signup → calls Java backend
router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const data = await registerUser(email, username, password);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Signup failed' });
  }
});

module.exports = router;
