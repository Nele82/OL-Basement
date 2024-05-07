// MongoDB - Items model & mongoose library
const Item = require('../models/itemModel')
const mongoose = require('mongoose')

// Get all storage items
const getAllItems = async (req, res) => {    
    const {id} = req.params

    let items = await Item.find({storageId: id})

    try {
        if (items.length == 0) {
            return res.status(200).json(items)
        } else {
            items = await Item.find({storageId: id}).sort({createdAt: -1})
            res.status(200).json(items)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }    
}

// Create a new item
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

    try {
        const item = await Item.create({itemTitle, length, width, height, description, category, storageId})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Delete an item
const removeItem = async (req, res) => {
    const {id} = req.params

    try {
        const deleteEntry = await Item.deleteOne({_id: id})
        res.status(200).json(deleteEntry)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Delete all items assigned to one storage
const removeAllStorageItems = async (req, res) => {
    const {store} = req.params

    try {
        const deletedItems = await Item.deleteMany({storageId: store})
        res.status(200).json(deletedItems)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Update an item
const updateItem = async (req, res) => {
    const {id, store} = req.params  
    const {
        itemTitle, 
        length, 
        width, 
        height, 
        description, 
        category
    } = req.body 

    try {
        await Item.updateOne({_id: id}, {$set: {itemTitle: itemTitle, length: length, width: width, height: height, description: description, category: category}})
        let items = await Item.find({storageId: store})
        if (items.length == 0) {
            return res.status(200).json(items)
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