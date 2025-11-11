const axios = require('axios');
const { handleAxiosError } = require('../utils/errorHandler');

const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';

/**
 * Generic function to call Java backend APIs.
 * Automatically logs and handles axios errors.
 * @param {string} endpoint - API endpoint (e.g., '/movies/popular')
 */
async function fetchFromJavaAPI(endpoint) {
  try {
    const url = `${backendURL}${endpoint}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    handleAxiosError(err, `fetchFromJavaAPI(${endpoint})`);
    // Re-throw so calling service (movies, series, etc.) can handle fallback if needed
    throw err;
  }
}

module.exports = { fetchFromJavaAPI };
