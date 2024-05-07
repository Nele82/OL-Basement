const express = require('express') 
const { getAllItems, createItem, removeItem, updateItem, removeAllStorageItems } = require('../controllers/itemsController')
const router = express.Router() 

// Get all items - GET
router.get('/getItems/:id', getAllItems)

// Create a new item - POST
router.post('/createItem', createItem)

// Update item - PATCH
router.patch('/updateItem/:store/:id', updateItem)

// Delete an item - DELETE
router.delete('/deleteItem/:id', removeItem)

// Delete all items assigned to one storage - DELETE
router.delete('/deleteAllStorageItems/:store', removeAllStorageItems)

module.exports = router