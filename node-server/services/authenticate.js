const { fetchFromJavaAPI } = require('./fetchFromJavaAPI'); // your util
const { handleAxiosError } = require('../utils/errorHandler');

/**
 * Login user via Java backend
 * @param {string} email
 * @param {string} password
 */
const authenticateUser = async (email, password) => {

    const response = await fetchFromJavaAPI('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
    // Expecting: { token: "...", message: "Login successful" }
    return response;
  
};

/**
 * Signup user via Java backend
 * @param {string} email
 * @param {string} password
 * @param {string} username
 */
const registerUser = async (email, username, password) => {
    const response = await fetchFromJavaAPI('/auth/signup', {
      method: 'POST',
      data: { email, username, password },
    });
    // Expecting: { token: "...", message: "Signup successful" }
    return response;
  
};

module.exports = { authenticateUser, registerUser };
