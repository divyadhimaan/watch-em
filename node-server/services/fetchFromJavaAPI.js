const axios = require('axios');

const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';

/**
 * Generic function to call Java backend APIs.
 * Supports GET/POST and automatically handles axios errors.
 * @param {string} endpoint - API endpoint (e.g., '/movies/popular')
 * @param {object} options - Axios options (method, data, headers)
 */
async function fetchFromJavaAPI(endpoint, options = {}) {
  try {
    const url = `${backendURL}/api${endpoint}`;
    const response = await axios({
      url,
      method: options.method || 'GET',
      data: options.data,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return response.data;
  } catch (err) {
    // Attach status/message to error before throwing
    // handleAxiosError(err, `fetchFromJavaAPI(${endpoint})`);
    if (err.response) {
      const { status, data } = err.response;
      const message = data?.message || data?.error || err.message;

      // Throw a custom error that contains status and message
      const enhancedError = new Error(message);
      enhancedError.status = status;
      throw enhancedError;
    } else {
      const enhancedError = new Error(err.message);
      enhancedError.status = 500;
      throw enhancedError;
    }
  }
}

module.exports = { fetchFromJavaAPI };