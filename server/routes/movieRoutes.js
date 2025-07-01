const express = require('express');
const axios = require('axios');
const router = express.Router();  

const {
    fetchMoviesByType,
    getPopularMovies,
    getTopRatedMovies,
    fetchMovieDetailsById
  } = require('../services/fetchMovies');



// Route to get  movies

router.get('/movies/popular', async (req, res) => {
    const movies = getPopularMovies();

    if (movies.length === 0){
        console.log('Popular Movies not cached, fetching from API...');
        await fetchMoviesByType('popular');
    } 
  
    res.json(getPopularMovies());
});
  
router.get('/movies/top-rated', async (req, res) => {
    const movies = getTopRatedMovies();
   
    if (movies.length === 0){
        console.log('Top Rated Movies not cached, fetching from API...');
        await fetchMoviesByType('top-rated');
    }
    res.json(getTopRatedMovies());
});

router.get('/movie/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const details = await fetchMovieDetailsById(id);
        console.log('📦 Movie details from Java backend:', details);
        res.json(details);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movie details' });
      }
});


module.exports = router;
