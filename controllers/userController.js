const { User } = require('../models/index.js'); 

const { sendEmail } = require('../utils/sendEmail');
const addUser = async (req, res) => {
  const { email, latitude, longitude } = req.body;

  try {
    if (!email || !latitude || !longitude) {
      return res.status(400).json({ message: 'Email, latitude, and longitude are required' });
    }

    console.log("Received body:", req.body);

    const user = new User({
      email,
      location: { lat: latitude, lon: longitude },
    });

    await user.save();

    // ✅ Send email
    try {
      await sendEmail(email, 'Your 3-Hour Weather Update', {
        username: email.split('@')[0], // Extract username from email
        city: 'London', // Hardcoded for now — replace later with actual city if available
        date: new Date().toISOString().split('T')[0],
        icon: '01d', // Dummy icon, replace with real data later
        summary: 'Clear sky',
        temperature: '25', // Dummy temperature, can be dynamic later
        description: 'Clear sky',
      });
      console.log(` Email sent to ${email}`);
    } catch (err) {
      console.error(`Failed to send email to ${email}:`, err.message);
    }

    res.status(201).json({ message: 'User added successfully', data: user });

  } catch (error) {
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};

const updateLocation = async (req, res) => {
  const { email } = req.params;
  const { latitude, longitude } = req.body;

  try {
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    console.log("Received body:", req.body);


    const user = await User.findOneAndUpdate(
      { email },
      { 'location.lat': latitude, 'location.lon': longitude },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update location', error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User retrieved successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
  }
};

const getsendEmail = async (req, res) => {
  const { email } = req.params;   

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

    res.status(200).json({ message: 'User retrieved successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error: error.message }); 
  } 
};

module.exports = {
  addUser,
  updateLocation,
  getUserByEmail,
  getsendEmail,
};