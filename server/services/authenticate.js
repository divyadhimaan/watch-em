const axios = require('axios');
const backendURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';

const authenticateUser = async () => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Authentication response data:", data);
    //   localStorage.setItem("token", data.token);
  };

   

module.exports = {
    authenticateUser,
  };