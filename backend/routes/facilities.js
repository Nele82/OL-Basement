const express = require('express') // Express library
const { getAllStorages, createStorage } = require('../controllers/storageController')
const authorizeRequest = require('../middleware/authorizeRequest')
const router = express.Router() // Router

// Require autorization
router.use(authorizeRequest)

// Get the storage - GET
router.get('/getStorages', getAllStorages)

// Create a new storage - POST
router.post('/createStorage', createStorage)

module.exports = router