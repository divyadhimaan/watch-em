const express = require('express');
const axios = require('axios');
const router = express.Router();  

const {
    fetchMoviesByType,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getInTheatreMovies,
    fetchMoviesBySlug,
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

router.get('/movies/upcoming', async (req, res) => {
    const movies = getUpcomingMovies();
   
    if (movies.length === 0){
        console.log('Upcoming Movies not cached, fetching from API...');
        await fetchMoviesByType('upcoming');
    }
    res.json(getUpcomingMovies());
});

router.get('/movies/in-theatres', async (req, res) => {
    const movies = getInTheatreMovies();
   
    if (movies.length === 0){
        console.log('In Theatre Movies not cached, fetching from API...');
        await fetchMoviesByType('in-theatres');
    }
    res.json(getInTheatreMovies());
});

router.get('/movies/filters/:slug', async (req, res) => {
    const { slug } = req.params;
    try {
        const movies = await fetchMoviesBySlug(slug);
        res.json(movies);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies by slug' });
      }
});

router.get('/movie/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const details = await fetchMovieDetailsById(id);
        res.json(details);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movie details' });
      }
});


module.exports = router;
