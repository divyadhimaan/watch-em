const Series = require('../../models/Series');
const { createTmdbService } = require('./baseTmdbService');
const { fetchFromJavaAPI } = require('../fetchFromJavaAPI');
const { checkBackendHealth } = require('../backendHealth');

const baseSeriesService = createTmdbService({
  model: Series,
  baseEndpoint: '/series',
  entityName: 'series',
  prefetchTypes: ['popular', 'top-rated', 'on-air', 'all'], 
});

// Series-specific: "On Air" shows
const getOnAir = async () => {
  const backendUp = await checkBackendHealth();

  if (backendUp) {
    try {
      const data = await fetchFromJavaAPI('/series/on-air');
      const items = data.results || [];

      await Series.updateOne(
        { type: 'on-air' },
        { $set: { data: items } },
        { upsert: true }
      );

      console.log(`📺 Cached ${items.length} on-air series`);
      return items;
    } catch (err) {
      console.warn('⚠️ Failed to fetch on-air series, fallback to MongoDB');
    }
  }

  const cached = await Series.findOne({ type: 'on-air' });
  return cached?.data || [];
};

module.exports = {
  ...baseSeriesService,
  getOnAir,
};
