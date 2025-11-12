// Centralized Axios Error Handler
const handleAxiosError = (err, context = '') => {
  if (err.response) {
    const { status, statusText } = err.response;
    console.error(`❌ [${context}] Java API Error (${status} ${statusText})`);

    if (status === 403) console.warn('🚫 Permission denied — check Spring Security or auth headers.');
    else if (status === 404) console.warn('🔍 Resource not found — verify endpoint or movie type.');
    else if (status >= 500) console.warn('💥 Server error — Java backend may be unstable.');
  } else if (err.code === 'ECONNREFUSED') {
    console.error('❌ Connection refused — backend may not be running.');
  } else if (err.code === 'ECONNABORTED') {
    console.error('⏱️ Request timeout — backend took too long to respond.');
  } else {
    console.error(`⚠️ Unexpected error (${context}):`, err.message);
  }
};

module.exports = { handleAxiosError };
