// const axios = require('axios');

// exports.getCityName = async (lat, lon) => {
//   const apiKey = process.env.GOOGLE_API_KEY;
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

//   try {
//     const res = await axios.get(url);
//     const results = res.data.results;

//     if (!results.length) {
//       console.error("No results found:", res.data);
//       return "Unknown City";
//     }

//     const components = results[0].address_components;

//     // Try 'locality' first, fallback to 'postal_town'
//     const city = components.find(c =>
//       c.types.includes("locality")
//     )?.long_name || components.find(c =>
//       c.types.includes("postal_town")
//     )?.long_name;

//     return city || "Unknown City";
//   } catch (error) {
//     console.error("Failed to fetch city from coordinates:", error.response?.data || error.message);
//     return "Unknown City";
//   }
// };
