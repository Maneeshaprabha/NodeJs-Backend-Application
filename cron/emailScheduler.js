const cron = require('node-cron');
const User = require('../models/user');
const { fetchWeather } = require('../services/weatherService');
const { sendEmail } = require('../services/emailService');
const { getWeatherSummary } = require('../services/aiService');

cron.schedule('0 */3 * * *', async () => {
  const users = await User.find();
  for (const user of users) {
    try {
      const data = await fetchWeather(user.location.lat, user.location.lon);
      const summary = await getWeatherSummary(data);
      const date = new Date().toISOString().split('T')[0];

      user.weather.push({ date, data, summary });
      await user.save();

      await sendEmail(user.email, '3-Hour Weather Report', summary);
    } catch (err) {
      console.error(`Failed to send email to ${user.email}:`, err.message);
    }
  }
});
