// MongoDB - Items model & mongoose library
const Item = require('../models/itemModel')

// GET ALL STORAGE ITEMS
const getAllItems = async (req, res) => {    
    const {id} = req.params
    // Finds an item via mongoose 'find' method
    let items = await Item.find({storageId: id})
    // Response handler
    try {
        // Returns an empty array
        if (items.length == 0) {
            return res.status(200).json(items)
        } else {
            // Sorts all items by date of creation (newest to oldest)
            items = await Item.find({storageId: id}).sort({createdAt: -1})
            res.status(200).json(items)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }    
}

// CREATE A NEW ITEM
const createItem = async (req, res) => {
    const {
        itemTitle, 
        length, 
        width, 
        height, 
        description, 
        category, 
        storageId
    } = req.body   
    // Creates a new item via 'Item' model
    try {
        const item = await Item.create({itemTitle, length, width, height, description, category, storageId})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// DELETE AN ITEM
const removeItem = async (req, res) => {
    const {id} = req.params
    // Gets an id for the item previously obtained from MongoDB
    // and then deletes it via 'deleteOne' method from a collection 
    try {
        const deleteEntry = await Item.deleteOne({_id: id})
        res.status(200).json(deleteEntry)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// DELETE ALL ITEMS ASSIGNED TO ONE STORAGE
const removeAllStorageItems = async (req, res) => {
    const {store} = req.params
    // Deletes all items assigned to the same storage via 'deleteMany' method from a collection 
    // using a common property for all items - the 'storageId'
    // This function is called when a User chooses to delete a storage facility
    try {
        const deletedItems = await Item.deleteMany({storageId: store})
        res.status(200).json(deletedItems)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// UPDATE AN ITEM
const updateItem = async (req, res) => {
    const {store, id} = req.params  
    const {
        itemTitle, 
        length, 
        width, 
        height, 
        description, 
        category
    } = req.body 
    // Updates an item using the 'updateOne' method and its '$set' operator
    try {
        await Item.updateOne({_id: id}, {$set: {itemTitle: itemTitle, length: length, width: width, height: height, description: description, category: category}})
        let items = await Item.find({storageId: store})
        if (items.length == 0) {
            return res.status(200).json(items)
        // Sorts all items by date of creation (newest to oldest) as otherwise it would return
        // all items sorted the other way around by default
        } else {
            items = await Item.find({storageId: store}).sort({createdAt: -1})
            res.status(200).json(items)
        }    
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { 
    getAllItems,
    createItem,
    removeItem,
    updateItem,
    removeAllStorageItems
}