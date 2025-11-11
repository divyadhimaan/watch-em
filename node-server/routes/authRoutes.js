const express = require('express');
const router = express.Router();  

const { autenticateUser } = require('../services/authenticate');


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
        res.status(500).json({ error: 'Login failed. Please check your credentials or backend connection.' });
      }
});

module.exports = router;
