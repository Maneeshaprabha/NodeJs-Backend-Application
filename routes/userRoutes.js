const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { addUser, updateLocation, getUserByEmail,getsendEmail } = require('../controllers/userController');

router.post('/email', addUser);
router.put('/email/location', updateLocation);
router.get('/email', getUserByEmail); 
router.post('/send-email', getsendEmail);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { addUser } = require('../controllers/userController');

// // POST /email
// router.post('/email', addUser);

// module.exports = router;

