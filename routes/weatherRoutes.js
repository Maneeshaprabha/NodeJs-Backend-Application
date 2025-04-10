const express = require('express');
const router = express.Router();
const { createUserWeatherReport, getAllWeatherReports, getWeatherByDate } = require('../controllers/weatherController');

router.post('/report', createUserWeatherReport);
router.get('/report', getAllWeatherReports);
router.get('/:email/:date', getWeatherByDate);

module.exports = router;