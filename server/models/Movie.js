
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // TMDB ID
  title: String,
  data: Object,
  type: { type: String, enum: ['popular', 'top-rated', 'details'], required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // ⏳ 24 hours in seconds
  }
});

module.exports = mongoose.model('Movie', movieSchema);
