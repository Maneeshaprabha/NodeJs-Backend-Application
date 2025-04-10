const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { addUser, updateLocation, getUserByEmail } = require('../controllers/userController');

router.post('/', addUser);
router.put('/:email/location', updateLocation);
router.get('/:email', getUserByEmail); 

module.exports = router;