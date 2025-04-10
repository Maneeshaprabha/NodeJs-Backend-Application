// const axios = require('axios');

// exports.getWeatherSummary = async (weatherData) => {
//   const prompt = `Summarize this weather data in a friendly tone:\n${JSON.stringify(weatherData)}`;
//   const response = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }]
//     },
//     { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
//   );
//   return response.data.choices[0].message.content.trim();
// };
