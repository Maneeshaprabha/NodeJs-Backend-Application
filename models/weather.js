const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  temperature: Number,
  description: String,
  location: {
    lat: Number,
    lon: Number,
    city: String,
  },
});

module.exports = mongoose.model('Weather', weatherSchema);
