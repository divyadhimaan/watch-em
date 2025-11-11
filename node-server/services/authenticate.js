const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';

const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, { email, password });
      console.log("✅ Authentication success:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Authentication failed:", err.message);
      throw err;
    }
  };

   

module.exports = {
    authenticateUser,
  };