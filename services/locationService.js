const axios = require('axios');

exports.getCityName = async (lat, lon) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await axios.get(url);
  const components = response.data.results[0]?.address_components;
  const city = components?.find(c => c.types.includes('locality'))?.long_name;
  return city || 'Unknown';
};
