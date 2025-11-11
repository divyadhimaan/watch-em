const { checkBackendHealth } = require('../backendHealth');
const { fetchFromJavaAPI } = require('../fetchFromJavaAPI');

/**
 * Base TMDB Service (shared for movie & series)
 * Handles: cache, MongoDB sync, details, slug, prefetch
 */
function createTmdbService({ model, baseEndpoint, entityName, prefetchTypes }) {
  const memoryCache = {};

  // Helper to update MongoDB + memory
  const updateCache = async (type, items) => {
    if (!Array.isArray(items) || items.length === 0) return;

    await model.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: { id: item.id, type },
          update: { $set: { data: item } },
          upsert: true,
        },
      }))
    );

    memoryCache[type] = items;
    console.log(`📥 Cached ${items.length} ${type} ${entityName} in MongoDB and memory`);
  };

  // Fetch by type (popular/top-rated/etc)
  const fetchByType = async (type) => {
    const cached = await model.find({ type });
    if (cached.length > 0) {
      const list = cached.map(doc => doc.data);
      memoryCache[type] = list;
      console.log(`✅ Loaded ${type} ${entityName} from MongoDB`);
      return;
    }

    const backendUp = await checkBackendHealth();
    if (!backendUp) {
      console.warn(`⚠️ Backend down — skipping ${type} ${entityName}`);
      return;
    }

    const data = await fetchFromJavaAPI(`${baseEndpoint}/${type}`);
    const items = data.results || [];
    await updateCache(type, items);
  };

  // Fetch details by ID
  const fetchDetailsById = async (id) => {
    const backendUp = await checkBackendHealth();

    if (backendUp) {
      try {
        const data = await fetchFromJavaAPI(`${baseEndpoint}/details/${id}`);
        await model.updateOne({ id, type: 'details' }, { $set: { data } }, { upsert: true });
        console.log(`🎬 ${entityName} details fetched for ID: ${id}`);
        return data;
      } catch (err) {
        console.warn(`⚠️ Backend failed, falling back to MongoDB for ${entityName} ID: ${id}`);
      }
    }

    const cached = await model.findOne({ id, type: 'details' });
    if (cached) {
      console.log(`✅ Loaded ${entityName} details from MongoDB cache`);
      return cached.data;
    }

    throw new Error(`❌ ${entityName} details not found for ID: ${id}`);
  };

  // Fetch by slug
  const fetchBySlug = async (slug) => {
    const slugType = `slug:${slug}`;
    const backendUp = await checkBackendHealth();

    if (backendUp) {
      try {
        const data = await fetchFromJavaAPI(`${baseEndpoint}/filter/${slug}`);
        const items = data.results || [];
        await model.updateOne({ type: slugType }, { $set: { data: items } }, { upsert: true });
        return items;
      } catch {
        console.warn(`⚠️ Backend failed, falling back to MongoDB for slug: ${slug}`);
      }
    }

    const cached = await model.findOne({ type: slugType });
    if (cached && Array.isArray(cached.data)) return cached.data;

    throw new Error(`❌ Slug data not found in MongoDB for: ${slug}`);
  };

  const getByType = (type) => memoryCache[type] || [];

  const prefetchAll = async () => {
    const types = prefetchTypes || ['popular', 'top-rated', 'all']; 
    for (const type of types) {
      try {
        await fetchByType(type);
      } catch (err) {
        if (err?.response?.status === 403) {
          console.warn('🚫 Authorization issue — stopping prefetch');
          break;
        }
      }
    }
    console.log(`✅ Prefetched all ${entityName}`);
  };

  return {
    fetchByType,
    fetchDetailsById,
    fetchBySlug,
    prefetchAll,
    getAll: () => getByType('all'),
    getPopular: () => getByType('popular'),
    getTopRated: () => getByType('top-rated'),
  };
}

module.exports = { createTmdbService };
