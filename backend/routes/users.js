const express = require('express') // Express.js library
const { signupUser, loginUser } = require('../controllers/userController') // Controller functions
const router = express.Router() // Router

// Sign Up route
router.post('/signup', signupUser)

// Log In route
router.post('/login', loginUser)

module.exports = router