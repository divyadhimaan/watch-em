const { fetchFromJavaAPI } = require('../fetchFromJavaAPI');

/**
 * Signup user via Java backend
 * @param {string} token - "Bearer <jwt>"
 */
const fetchProfile = async (token) => {
    const response = await fetchFromJavaAPI('/profile/me', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    return response;

};

module.exports = { fetchProfile };
 