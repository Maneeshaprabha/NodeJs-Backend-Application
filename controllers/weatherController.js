const User = require('../models/user');

exports.getWeatherByDate = async (req, res) => {
  const { email, date } = req.params;
  try {
    const user = await User.findOne({ email });
    const data = user.weather.find(w => w.date === date);
    if (!data) return res.status(404).json({ message: 'No data found for this date.' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
