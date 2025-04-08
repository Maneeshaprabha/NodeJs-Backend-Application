const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
  date: { type: String, required: true },
  data: { type: Object, required: true },
  summary: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    city: { type: String },
  },
  weather: [WeatherDataSchema],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;