// utils/sendEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Email Template Function
const emailTemplate = (username, city, date, icon, summary, temperature, description) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather Update</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f2f5;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #4a90e2 0%, #5e72e4 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      position: relative;
    }
    
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .header-icon {
      font-size: 24px;
      margin-bottom: 10px;
      display: block;
    }
    
    /* Content */
    .content {
      padding: 30px;
      color: #333333;
    }
    
    .content h2 {
      font-size: 22px;
      margin-top: 0;
      margin-bottom: 20px;
      color: #2c3e50;
      border-bottom: 2px solid #f0f2f5;
      padding-bottom: 10px;
    }
    
    .greeting {
      font-size: 18px;
      margin-bottom: 25px;
    }
    
    /* Weather Card */
    .weather-card {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
      margin-bottom: 25px;
      border-left: 5px solid #4a90e2;
    }
    
    .weather-location {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    
    .location-icon {
      margin-right: 8px;
      color: #4a90e2;
    }
    
    .weather-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      padding: 20px;
    }
    
    .weather-item {
      flex: 1;
      min-width: 120px;
      text-align: center;
      padding: 15px 10px;
      border-radius: 8px;
      margin: 5px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
      transition: transform 0.2s;
    }
    
    .weather-item:hover {
      transform: translateY(-3px);
    }
    
    .weather-label {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .weather-value {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .temperature {
      color: #e74c3c;
    }
    
    .summary {
      color: #3498db;
    }
    
    .conditions {
      color: #2ecc71;
    }
    
    /* Message */
    .message {
      background-color: #f8fafc;
      border-radius: 8px;
      padding: 20px;
      margin-top: 25px;
      border-left: 3px solid #2ecc71;
    }
    
    .message p {
      margin: 0;
      font-size: 16px;
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, #4a90e2 0%, #5e72e4 100%);
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 14px;
    }
    
    .footer a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px dotted rgba(255, 255, 255, 0.6);
      padding-bottom: 2px;
      transition: border-color 0.2s;
    }
    
    .footer a:hover {
      border-color: #ffffff;
    }
    
    .social-links {
      margin-top: 15px;
    }
    
    .social-link {
      display: inline-block;
      margin: 0 10px;
      color: white;
      font-size: 18px;
    }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container {
        margin: 10px;
        width: auto;
      }
      
      .content {
        padding: 20px;
      }
      
      .weather-item {
        min-width: 100%;
        margin: 5px 0;
      }
    }
    
    /* Icons (using emoji as placeholders) */
    .icon {
      font-style: normal;
      font-size: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="header-icon">☁️</span>
      <h1>Your Weather Update</h1>
    </div>
    
    <div class="content">
      <h2>Hello, {{username}}!</h2>
      
      <div class="weather-card">
        <div class="weather-location">
          <span class="icon location-icon">📍</span> {{city}} • {{date}}
        </div>
        
        <div class="weather-details">
          <div class="weather-item">
            <div class="weather-label">SUMMARY</div>
            <div class="weather-value summary">
              <span class="icon">🌤️</span> {{summary}}
            </div>
          </div>
          
          <div class="weather-item">
            <div class="weather-label">TEMPERATURE</div>
            <div class="weather-value temperature">
              <span class="icon">🌡️</span> {{temperature}}°C
            </div>
          </div>
          
          <div class="weather-item">
            <div class="weather-label">CONDITIONS</div>
            <div class="weather-value conditions">
              <span class="icon">🌈</span> {{description}}
            </div>
          </div>
        </div>
      </div>
      
      <div class="message">
        <p>Stay prepared and have a wonderful day ahead! Remember to dress appropriately for the weather conditions.</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Powered by Weather API</p>
      <p><a href="#">Unsubscribe</a> • <a href="#">View in Browser</a> • <a href="#">Preferences</a></p>
      
      <div class="social-links">
        <a href="#" class="social-link">📱</a>
        <a href="#" class="social-link">💻</a>
        <a href="#" class="social-link">📧</a>
      </div>
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

module.exports = { sendEmail };
