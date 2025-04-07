const express = require('express');
const router = express.Router();
const { getWeatherByDate } = require('../controllers/weatherController');

router.get('/:email/:date', getWeatherByDate);

module.exports = router;
