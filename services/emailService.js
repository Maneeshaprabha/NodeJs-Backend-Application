// utils/sendEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Email Template Function
const emailTemplate = (username, city, date, icon, summary, temperature, description) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather Update</title>
    <style>
      /* Add your styles here */
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your 3-Hour Weather Update</h1>
      </div>
      <div class="content">
        <h2>Hello, ${username}!</h2>
        <p>Here’s your latest weather update for ${city} on ${date}:</p>
        <div class="weather-details">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon" />
          <p><strong>Summary:</strong> ${summary}</p>
          <p><strong>Temperature:</strong> ${temperature}°C</p>
          <p><strong>Conditions:</strong> ${description}</p>
        </div>
        <p>Stay prepared and have a great day!</p>
      </div>
      <div class="footer">
        <p>Weather API | <a href="#">Unsubscribe</a></p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function
const sendEmail = async (to, subject, data) => {
  const html = emailTemplate(data.username, data.city, data.date, data.icon, data.summary, data.temperature, data.description);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${to}: ${info.response}`);
    return info;
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};


// const testEmail = async () => {
//   try {
//     await sendEmail('maneeprabha28@gmail.com', 'Test Email', {
//       username: 'Matheesha',
//       city: 'Colombo',
//       date: new Date().toISOString().split('T')[0],
//       summary: 'Clear sky',
//       temperature: '30',
//       description: 'Clear sky',
//     });
//     console.log('Test email sent successfully');
//   } catch (error) {
//     console.error('Test email failed:', error.message);
//   }
// };
// testEmail(); 

// Test function to send an email immediately (for testing purposes)
// const testEmail = async () => {
//   try {
//     await sendEmail('test@example.com', 'Test Email', {
//       username: 'Matheesha',
//       city: 'Colombo',
//       date: new Date().toISOString().split('T')[0],
//       summary: 'Clear sky',
//       temperature: '30',
//       description: 'Clear sky',
//     });
//     console.log('Test email sent successfully');
//   } catch (error) {
//     console.error('Test email failed:', error.message);
//   }
// };

// Run the test immediately
// testEmail();kjklj 

module.exports = { sendEmail };
