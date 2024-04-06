const express = require('express') // Express.js library
const { signupUser } = require('../controllers/userController') // Controller functions
const router = express.Router() // Router

// Sign Up route
router.post('/signup', signupUser)

module.exports = router