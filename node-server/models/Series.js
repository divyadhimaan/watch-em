
const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  id: { type: Number }, // TMDB ID
  title: String,
  data: Object,
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // ⏳ 24 hours in seconds
  }
});

seriesSchema.index({ id: 1, type: 1 }, { unique: true });


module.exports = mongoose.models.Series || mongoose.model('Series', seriesSchema);
