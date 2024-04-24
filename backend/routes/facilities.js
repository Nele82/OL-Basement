const express = require('express') // Express library
const { getAllStorages, createStorage, removeStorage, updateStorage } = require('../controllers/storageController')
const authorizeRequest = require('../middleware/authorizeRequest')
const router = express.Router() // Router

// Require autorization
router.use(authorizeRequest)

// Get the storage - GET
router.get('/getStorages', getAllStorages)

// Create a new storage - POST
router.post('/createStorage', createStorage)

// Update storage - PATCH
router.patch('/updateStorage/:id', updateStorage)

// Delete a storage - DELETE
router.delete('/deleteStorage/:id', removeStorage)

module.exports = router