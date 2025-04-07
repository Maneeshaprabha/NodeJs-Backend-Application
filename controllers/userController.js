const axios = require('axios');
const Weather = require('../models/Weather');
const { getCityFromCoordinates } = require('../utils/googleUtils');

const fetchWeatherData = async (lat, lon) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};

const createUserWeatherReport = async (req, res) => {
  const { email, latitude, longitude } = req.body;

  try {
    const weatherData = await fetchWeatherData(latitude, longitude);
    const location = await getCityFromCoordinates(latitude, longitude);

    const report = new Weather({
      email,
      location,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description,
    });

    await report.save();

    res.status(201).json({
      message: 'Weather report saved successfully',
      data: report
    });
  } catch (error) {
    console.error('Error saving weather report:', error.message);
    res.status(500).json({ message: 'Failed to save weather report' });
  }
};

const getAllWeatherReports = async (req, res) => {
  try {
    const reports = await Weather.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather reports' });
  }
};

module.exports = {
  createUserWeatherReport,
  getAllWeatherReports,
};
