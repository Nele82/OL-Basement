const express = require('express') // Express.js library
const { signupUser, loginUser, requestReset, resetPassword } = require('../controllers/userController') // Controller functions
const router = express.Router() // Router

// Sign Up route
router.post('/signup', signupUser)

// Log In route
router.post('/login', loginUser)

// Reset request route
router.post('/requestReset', requestReset)

// Password reset route
router.post('/resetPassword', resetPassword)

module.exports = router