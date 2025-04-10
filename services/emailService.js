const nodemailer = require('nodemailer');

// HTML email template generator
const getWeatherEmailTemplate = ({ username, city, date, summary, temperature, description }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weather Update</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4a90e2;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h2 {
      font-size: 20px;
      margin-top: 0;
    }
    .weather-details {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .weather-details p {
      margin: 5px 0;
      font-size: 16px;
    }
    .footer {
      background-color: #4a90e2;
      color: #ffffff;
      text-align: center;
      padding: 10px;
      font-size: 14px;
    }
    .footer a {
      color: #ffffff;
      text-decoration: underline;
    }
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, data) => {
  try {
    const text = `Your 3-Hour Weather Update\n\nHello, ${data.username}!\nHere’s your latest weather update for ${data.city} on ${data.date}:\n\nSummary: ${data.summary}\nTemperature: ${data.temperature}°C\nConditions: ${data.description}\n\nStay prepared and have a great day!`;
    const html = getWeatherEmailTemplate(data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}:`, info.response);
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Test function to send an email immediately
// const testEmail = async () => {
//   try {
//     // Test with plain text only (since we don't have weather data for the test)
//     await sendEmail('matheeshasathsarani@gmail.com', 'Test Email', {
//       username: 'Matheesha',
//       city: 'Unknown City',
//       date: new Date().toISOString().split('T')[0],
//       summary: 'This is a test email.',
//       temperature: 'N/A',
//       description: 'N/A',
//     });
//     console.log('Test email sent successfully');
//   } catch (error) {
//     console.error('Test email failed:', error.message);
//   }
// };

// Run the test immediately
// testEmail();

module.exports = { sendEmail };