const { Weather, User } = require('../models'); // Should resolve to D:\weather-api\models\index.js
const { fetchWeather } = require('../services/weatherService');
const { getCityFromCoordinates } = require('../utils/googleUtils');

const createUserWeatherReport = async (req, res) => {
  const { email, latitude, longitude } = req.body;

  try {
    if (!email || !latitude || !longitude) {
      return res.status(400).json({ message: 'Email, latitude, and longitude are required' });
    }

    const weatherData = await fetchWeather(latitude, longitude);
    const city = await getCityFromCoordinates(latitude, longitude);

    const report = new Weather({
      email,
      location: { lat: latitude, lon: longitude, city },
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].split('.')[0],
    });

    await report.save();
    res.status(201).json({ message: 'Weather report saved successfully', data: report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save weather report', error: error.message });
  }
};

const getAllWeatherReports = async (req, res) => {
  try {
    const reports = await Weather.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather reports', error: error.message });
  }
};

const getWeatherByDate = async (req, res) => {
  const { email, date } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weatherData = user.weather.find(w => w.date === date);
    if (!weatherData) {
      return res.status(404).json({ message: 'No weather data found for this date' });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
  }
};

module.exports = {
  createUserWeatherReport,
  getAllWeatherReports,
  getWeatherByDate,
};