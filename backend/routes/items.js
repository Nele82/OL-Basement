const express = require('express') 
const { getAllItems, createItem, removeItem } = require('../controllers/itemsController')
const { removeAllListeners } = require('../models/itemModel')
const router = express.Router() 

// Get all items - GET
router.get('/getItems/:id', getAllItems)

// Create a new item - POST
router.post('/createItem', createItem)

// Update item - PATCH
// router.patch('/updateItem', updateItem)

// Delete an item - DELETE
router.delete('/deleteItem', removeItem)

module.exports = router