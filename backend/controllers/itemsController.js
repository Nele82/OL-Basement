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

module.exports = { 
    getAllItems
}