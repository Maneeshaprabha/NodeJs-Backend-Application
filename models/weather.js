const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    city: { type: String, required: true },
  },
});

const Weather = mongoose.models.Weather || mongoose.model('Weather', weatherSchema);

module.exports = Weather;