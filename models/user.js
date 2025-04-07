const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
  date: String,
  data: Object,
  summary: String
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    lat: Number,
    lon: Number,
    city: String
  },
  weather: [WeatherDataSchema]
});

module.exports = mongoose.model('User', UserSchema);
