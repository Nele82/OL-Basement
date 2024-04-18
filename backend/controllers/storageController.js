// MongoDB - model & library
const Facility = require('../models/storageModel') 
const mongoose = require('mongoose')

// Get storages
const getAllStorages = async (req, res) => {    
    const user = req.user._id 

    let storages = await Facility.find({user_id: user})

    if (storages.length == 0) {
        return res.status(200).json(storages)
    } else {
        storages = await Facility.find({user_id: user}).sort({createdAt: -1})
    }

    res.status(200).json(storages)
}

// Create a new storage
const createStorage = async (req, res) => {
    const {
        facilityName, 
        length, 
        width, 
        height
    } = req.body   
    
    const user_id = req.user._id 

    try {
        const storage = await Facility.create({facilityName, length, width, height, user_id})
        res.status(200).json(storage)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Delete a storage
const removeStorage = async (req, res) => {
    const {id} = req.params

    try {
        const deleteEntry = await Facility.deleteOne({_id: id})
        res.status(200).json(deleteEntry)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { 
    getAllStorages,
    createStorage,
    removeStorage
}