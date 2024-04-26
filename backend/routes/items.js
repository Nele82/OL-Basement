const express = require('express') 
const authorizeRequest = require('../middleware/authorizeRequest')
const { getAllItems } = require('../controllers/itemsController')
const router = express.Router() 

// Require autorization
router.use(authorizeRequest)

// Get all items - GET
router.get('/getItems/:id', getAllItems)

// Create a new item - POST
// router.post('/createItem', createItem)

// Update item - PATCH
// router.patch('/updateItem', updateItem)

// Delete an item - DELETE
// router.delete('/deleteItem', removeItem)

module.exports = router