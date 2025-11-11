/**
 * Shared helper for all TMDB routes
 * Handles cache-first logic with automatic fallback to Java backend.
 */
async function handleCacheAndFetch(getFromCache, fetchFn, type, res) {
    try {
      const cached = getFromCache();
      if (cached.length > 0) {
        console.log(`✅ Served ${type} data from memory`);
        return res.json(cached);
      }
  
      await fetchFn(type);
      const updated = getFromCache();
      res.json(updated);
    } catch (err) {
      console.error(`❌ Failed to fetch ${type}`, err);
      res.status(500).json({ error: `Failed to fetch ${type}` });
    }
  }
  
  module.exports = { handleCacheAndFetch };
  