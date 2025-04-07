const axios = require('axios');

exports.fetchWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};
