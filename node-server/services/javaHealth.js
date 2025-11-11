const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
const BACKEND_HEALTH_URL = `${backendURL}/actuator/health`;

const checkJavaBackend = async () => {
  try {
    console.log(`🔍 Checking Java backend connectivity at ${BACKEND_HEALTH_URL} ...`);
    const response = await axios.get(BACKEND_HEALTH_URL, { timeout: 5000 });

    if (response.status === 200) {
      console.log(`✅ Java backend reachable: ${JSON.stringify(response.data)}`);
      return true; // ✅ must return true
    } else {
      console.warn(`⚠️ Java backend responded with non-200: ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.response) {
      console.error(`❌ Java backend error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      console.error(`❌ Unable to reach Java backend at ${backendURL}`);
      console.error(`Error: ${error.message}`);
    }
    return false; // ✅ must return false on any failure
  }
};

module.exports = { checkJavaBackend };
