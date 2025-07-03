
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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

movieSchema.index({ id: 1, type: 1 }, { unique: true });


module.exports = mongoose.model('Movie', movieSchema);
