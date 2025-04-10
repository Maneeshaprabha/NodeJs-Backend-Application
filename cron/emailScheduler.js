// cronJob.js
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
    console.log(`Found ${users.length} users in the database`);

    if (users.length === 0) {
      console.log('No users found, skipping email sending');
      return;
    }

    for (const user of users) {
      try {
        console.log(`Processing user: ${user.email}`);
        const { lat, lon } = user.location;
        console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
        const weatherData = await fetchWeather(lat, lon);
        console.log(`Weather data fetched: ${JSON.stringify(weatherData)}`);

        console.log('Fetching city name...');
        const city = await getCityName(lat, lon); // Use corrected function
        console.log(`City: ${city}`);

        console.log('Generating weather summary...');
        const summary = await getWeatherSummary(weatherData);
        console.log(`Weather summary: ${summary}`);

        const date = new Date().toISOString().split('T')[0];
        user.weather.push({ date, data: weatherData, summary });
        await user.save();
        console.log(`Saved weather data for ${user.email}`);

        const emailData = {
          username: user.email.split('@')[0],
          city: city || 'Unknown City',
          date,
          summary,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
        };

        console.log(`Sending email to ${user.email}...`);
        await sendEmail(user.email, '3-Hour Weather Report', emailData);
        console.log(`Weather update sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to process weather update for ${user.email}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Cron job error:', error.message);
  }
});