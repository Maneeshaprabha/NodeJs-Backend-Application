const axios = require('axios');

const getCityFromCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${lat},${lon}`,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const results = response.data.results;
    if (results.length === 0) {
      throw new Error('No location found for the given coordinates');
    }

    const addressComponents = results[0].address_components;
    const cityComponent = addressComponents.find(component =>
      component.types.includes('locality')
    );

    return cityComponent ? cityComponent.long_name : 'Unknown City';
  } catch (error) {
    console.error('Failed to fetch city from coordinates:', error.message);
    return 'Unknown City';
  }
};

module.exports = { getCityFromCoordinates };