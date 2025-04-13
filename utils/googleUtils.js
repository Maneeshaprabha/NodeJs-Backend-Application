const axios = require('axios');

const getCityFromCoordinates = async (lat, lon) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    const results = res.data.results;

    if (!results.length) {
      console.error("No results found:", res.data);
      return "Unknown City";
    }

    const components = results[0].address_components;

   
    const city = components.find(c =>
      c.types.includes("locality")
    )?.long_name || components.find(c =>
      c.types.includes("postal_town")
    )?.long_name;

    return city || "Unknown City";
  } catch (error) {
    console.error("Failed to fetch city from coordinates:", error.response?.data || error.message);
    return "Unknown City";
  }
}

const getWeatherSummary = (weatherData) => {
  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const wind = weatherData.wind.speed;

  return `Currently ${temp}°C with ${description}. Humidity is ${humidity}%, wind speed is ${wind} m/s.`;
};

module.exports = {
  getCityFromCoordinates,
  getWeatherSummary
};
