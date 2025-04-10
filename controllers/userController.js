const { User } = require('../models/index.js'); 
const addUser = async (req, res) => {
  const { email, latitude, longitude } = req.body;

  try {
    if (!email || !latitude || !longitude) {
      return res.status(400).json({ message: 'Email, latitude, and longitude are required' });
    }

    const user = new User({
      email,
      location: { lat: latitude, lon: longitude },
    });

    await user.save();
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

module.exports = {
  addUser,
  updateLocation,
  getUserByEmail,
};