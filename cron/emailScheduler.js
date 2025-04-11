
const cron = require('node-cron');
require("dotenv").config();
const { User } = require('../models');
const { fetchWeather } = require('../services/weatherService');
const { getWeatherSummary } = require('../services/aiService');
const { sendEmail } = require('../services/emailService');
const nodemailer = require("nodemailer");
const { getCityName } = require('../utils/googleUtils'); 

console.log('Cron job initialized');

// Run every minute for testing
cron.schedule('* * * * *', async () => {
  console.log('Running weather update cron job at:', new Date().toISOString());

  try {
    const users = await User.find();
    logger.info(`Found ${users.length} users`);

    if (users.length === 0) {
      logger.info('No users found, skipping email sending');
      return;
    }

    for (const user of users) {
      try {
        const { lat, lon } = user.location;
        logger.info(`Processing user: ${user.email}, lat: ${lat}, lon: ${lon}`);
        
        const weatherData = await fetchWeather(lat, lon);
        const city = await getCityName(lat, lon);
        const summary = await getWeatherSummary(weatherData);
        const date = new Date().toISOString().split('T')[0];

        user.weather.push({ date, data: weatherData, summary });
        await user.save();
        logger.info(`Saved weather data for ${user.email}`);

        const emailData = {
          username: user.email.split('@')[0],
          city: city || user.location.city || 'Unknown City',
          date,
          icon: weatherData.weather[0].icon,
          summary,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          lat,
          lon,
        };

        await sendEmail(user.email, '3-Hour Weather Report', emailData);
        logger.info(`Weather update sent to ${user.email}`);
      } catch (error) {
        logger.error(`Failed to process weather update for ${user.email}: ${error.message}`);
      }
    }
  } catch (error) {
    logger.error(`Cron job error: ${error.message}`);
  }
});