const axios = require('axios');

const getCityFromCoordinates = async (lat, lon) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      for (const component of results[0].address_components) {
        if (component.types.includes("locality")) {
          return component.long_name;
        }
      }
      // fallback if "locality" is not found
      return results[0].formatted_address;
    } else {
      return "Unknown location";
    }
  } catch (error) {
    console.error("Error in Google Geocoding API:", error.message);
    return "Error retrieving location";
  }
};

module.exports = { getCityFromCoordinates };
