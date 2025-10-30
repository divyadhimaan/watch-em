const express = require('express');
const axios = require('axios');
const router = express.Router();  

const {
    authenticateUser
  } = require('../services/authenticate');

router.post('/login', async (req, res) => {
    const token = authenticateUser();

    if (movies.length === 0){
        console.log(' Movies not cached, fetching from API...');
        await fetchMoviesByType('all');
    } 
  
    res.json(getAllMovies());
});