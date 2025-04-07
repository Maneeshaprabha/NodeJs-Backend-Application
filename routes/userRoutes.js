const express = require('express');
const router = express.Router();
const { addUser, updateLocation } = require('../controllers/userController');

router.post('/', addUser);
router.put('/:email/location', updateLocation);

module.exports = router;
